import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { generateUuid } from '../common/utils/generate-uuid.util';
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
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistsRepository.create(createArtistDto);
    return this.artistsRepository.save(newArtist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    Object.assign(artist, updateArtistDto);
    return this.artistsRepository.save(artist);
  }

  async remove(id: string): Promise<void> {
    const result = await this.artistsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Artist not found');
    }

    // Set artistId to null for all tracks that reference this artist
    const tracks = await this.tracksService.findAll();
    tracks.forEach(track => {
      if (track.artistId === id) {
        this.tracksService.update(track.id, { ...track, artistId: null });
      }
    });

    // Set artistId to null for all albums that reference this artist
    const albums = await this.albumsService.findAll();
    albums.forEach(album => {
      if (album.artistId === id) {
        this.albumsService.update(album.id, { ...album, artistId: null });
      }
    });
  }
} 