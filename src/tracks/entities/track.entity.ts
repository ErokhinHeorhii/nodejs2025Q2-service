import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the track',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'The name of the track',
    example: 'Bohemian Rhapsody'
  })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'The ID of the artist who created the track',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  artistId: string | null;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'The ID of the album the track belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  albumId: string | null;

  @Column()
  @ApiProperty({
    description: 'The duration of the track in seconds',
    example: 354
  })
  duration: number;

  @ManyToOne(() => Artist, artist => artist.tracks, { nullable: true })
  @JoinColumn({ name: 'artistId' })
  artist?: Artist | null;

  @ManyToOne(() => Album, { nullable: true })
  @JoinColumn({ name: 'albumId' })
  album?: Album | null;
} 