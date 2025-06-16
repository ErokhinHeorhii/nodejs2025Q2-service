import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { CustomLogger } from '../logging/logging.service';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly logger: CustomLogger,
  ) {}

  async findAll(): Promise<Artist[]> {
    this.logger.log('Getting all artists');
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    this.logger.log(`Finding artist with id ${id}`);
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      this.logger.warn(`Artist with id ${id} not found`);
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    this.logger.log(`Creating new artist: ${createArtistDto.name}`);
    const artist = this.artistsRepository.create(createArtistDto);
    return this.artistsRepository.save(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    this.logger.log(`Updating artist with id ${id}`);
    const artist = await this.findOne(id);
    Object.assign(artist, updateArtistDto);
    return this.artistsRepository.save(artist);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing artist with id ${id}`);
    const artist = await this.findOne(id);
    await this.artistsRepository.remove(artist);
  }
}
