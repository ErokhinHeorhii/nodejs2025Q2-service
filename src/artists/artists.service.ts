import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    try {
      const artist = await this.artistsRepository.findOneBy({ id });
      if (!artist) {
        throw new NotFoundException('Artist not found');
      }
      return artist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Artist not found');
    }
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistsRepository.create({
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    return this.artistsRepository.save(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);

    // Only update fields that are provided
    if (updateArtistDto.name !== undefined) {
      artist.name = updateArtistDto.name;
    }
    if (updateArtistDto.grammy !== undefined) {
      artist.grammy = updateArtistDto.grammy;
    }

    return this.artistsRepository.save(artist);
  }

  async remove(id: string): Promise<void> {
    const result = await this.artistsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Artist not found');
    }

    // Set artistId to null for all tracks that reference this artist
    const tracks = await this.tracksService.findAll();
    await Promise.all(
      tracks
        .filter((track) => track.artistId === id)
        .map((track) =>
          this.tracksService.update(track.id, { ...track, artistId: null }),
        ),
    );

    // Set artistId to null for all albums that reference this artist
    const albums = await this.albumsService.findAll();
    await Promise.all(
      albums
        .filter((album) => album.artistId === id)
        .map((album) =>
          this.albumsService.update(album.id, { ...album, artistId: null }),
        ),
    );
  }
}
