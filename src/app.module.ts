import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { User } from './users/entities/user.entity';
import { Artist } from './artists/entities/artist.entity';
import { Album } from './albums/entities/album.entity';
import { Track } from './tracks/entities/track.entity';
import { LoggingModule } from './logging/logging.module';
import { LoggingMiddleware } from './logging/logging.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { CustomLogger } from './logging/logging.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggingModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'home_library',
      entities: [User, Artist, Album, Track],
      synchronize: true,
      autoLoadEntities: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    AuthModule,
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    CustomLogger,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
