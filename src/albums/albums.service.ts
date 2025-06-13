import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    private readonly tracksService: TracksService,
  ) {}

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    try {
      const album = await this.albumsRepository.findOneBy({ id });
      if (!album) {
        throw new NotFoundException('Album not found');
      }
      return album;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Album not found');
    }
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumsRepository.create({
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    });
    return this.albumsRepository.save(album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    
    // Only update fields that are provided
    if (updateAlbumDto.name !== undefined) {
      album.name = updateAlbumDto.name;
    }
    if (updateAlbumDto.year !== undefined) {
      album.year = updateAlbumDto.year;
    }
    if (updateAlbumDto.artistId !== undefined) {
      album.artistId = updateAlbumDto.artistId;
    }

    return this.albumsRepository.save(album);
  }

  async remove(id: string): Promise<void> {
    const result = await this.albumsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Album not found');
    }

    // Set albumId to null for all tracks that reference this album
    const tracks = await this.tracksService.findAll();
    await Promise.all(
      tracks
        .filter((track) => track.albumId === id)
        .map((track) =>
          this.tracksService.update(track.id, { ...track, albumId: null }),
        ),
    );
  }
}
