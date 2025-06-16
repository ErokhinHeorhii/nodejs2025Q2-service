import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TracksService } from '../tracks/tracks.service';
import { CustomLogger } from '../logging/logging.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    private readonly tracksService: TracksService,
    private readonly logger: CustomLogger,
  ) {}

  async findAll(): Promise<Album[]> {
    this.logger.log('Getting all albums');
    return this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    this.logger.log(`Finding album with id ${id}`);
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      this.logger.warn(`Album with id ${id} not found`);
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    this.logger.log(`Creating new album: ${createAlbumDto.name}`);
    const album = this.albumsRepository.create(createAlbumDto);
    return this.albumsRepository.save(album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    this.logger.log(`Updating album with id ${id}`);
    const album = await this.findOne(id);
    Object.assign(album, updateAlbumDto);
    return this.albumsRepository.save(album);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing album with id ${id}`);
    const album = await this.findOne(id);
    await this.albumsRepository.remove(album);
  }
}
