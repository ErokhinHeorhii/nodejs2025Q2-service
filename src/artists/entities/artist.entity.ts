import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the artist',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'The name of the artist',
    example: 'Freddie Mercury'
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Whether the artist has won a Grammy',
    example: true
  })
  grammy: boolean;

  @OneToMany(() => Album, album => album.artist)
  albums?: Album[];

  @OneToMany(() => Track, track => track.artist)
  tracks?: Track[];
} 