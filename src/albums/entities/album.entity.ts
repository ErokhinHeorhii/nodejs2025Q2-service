import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the album',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'The name of the album',
    example: 'A Night at the Opera'
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'The year the album was released',
    example: 1975
  })
  year: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'The ID of the artist who created the album',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  artistId: string | null;

  @ManyToOne(() => Artist, artist => artist.albums, { nullable: true })
  @JoinColumn({ name: 'artistId' })
  artist?: Artist | null;
} 