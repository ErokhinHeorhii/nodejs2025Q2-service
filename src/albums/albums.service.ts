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
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = this.albumsRepository.create({
      ...createAlbumDto,
      artist: null,
    });
    return this.albumsRepository.save(newAlbum);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    Object.assign(album, updateAlbumDto);
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
        .filter(track => track.albumId === id)
        .map(track => this.tracksService.update(track.id, { ...track, albumId: null }))
    );
  }
} 