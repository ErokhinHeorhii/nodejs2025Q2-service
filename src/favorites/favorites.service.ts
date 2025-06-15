import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './entities/favorites.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { CustomLogger } from '../logging/logging.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    private readonly logger: CustomLogger,
  ) {}

  async findAll() {
    this.logger.log('Getting all favorites');
    const favorites = await this.favoritesRepository.findOne({
      where: { id: '1' },
    });

    if (!favorites) {
      this.logger.warn('Favorites not found, creating new');
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }

    // Получаем полные объекты для каждого ID
    const artists = await Promise.all(
      favorites.artists.map((id) => this.artistsService.findOne(id)),
    );
    const albums = await Promise.all(
      favorites.albums.map((id) => this.albumsService.findOne(id)),
    );
    const tracks = await Promise.all(
      favorites.tracks.map((id) => this.tracksService.findOne(id)),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addArtist(id: string): Promise<void> {
    this.logger.log(`Adding artist ${id} to favorites`);
    // Проверяем существование артиста
    await this.artistsService.findOne(id);

    let favorites = await this.favoritesRepository.findOne({
      where: { id: '1' },
    });

    if (!favorites) {
      favorites = this.favoritesRepository.create({
        id: '1',
        artists: [id],
        albums: [],
        tracks: [],
      });
    } else if (!favorites.artists.includes(id)) {
      favorites.artists = [...favorites.artists, id];
    }

    await this.favoritesRepository.save(favorites);
  }

  async removeArtist(id: string): Promise<void> {
    this.logger.log(`Removing artist ${id} from favorites`);
    const favorites = await this.favoritesRepository.findOne({
      where: { id: '1' },
    });

    if (!favorites || !favorites.artists.includes(id)) {
      this.logger.warn(`Artist with id ${id} not found in favorites`);
      throw new NotFoundException('Artist not found in favorites');
    }

    favorites.artists = favorites.artists.filter((artistId) => artistId !== id);
    await this.favoritesRepository.save(favorites);
  }

  async addAlbum(id: string): Promise<void> {
    this.logger.log(`Adding album ${id} to favorites`);
    // Проверяем существование альбома
    await this.albumsService.findOne(id);

    let favorites = await this.favoritesRepository.findOne({
      where: { id: '1' },
    });

    if (!favorites) {
      favorites = this.favoritesRepository.create({
        id: '1',
        artists: [],
        albums: [id],
        tracks: [],
      });
    } else if (!favorites.albums.includes(id)) {
      favorites.albums = [...favorites.albums, id];
    }

    await this.favoritesRepository.save(favorites);
  }

  async removeAlbum(id: string): Promise<void> {
    this.logger.log(`Removing album ${id} from favorites`);
    const favorites = await this.favoritesRepository.findOne({
      where: { id: '1' },
    });

    if (!favorites || !favorites.albums.includes(id)) {
      this.logger.warn(`Album with id ${id} not found in favorites`);
      throw new NotFoundException('Album not found in favorites');
    }

    favorites.albums = favorites.albums.filter((albumId) => albumId !== id);
    await this.favoritesRepository.save(favorites);
  }

  async addTrack(id: string): Promise<void> {
    this.logger.log(`Adding track ${id} to favorites`);
    // Проверяем существование трека
    await this.tracksService.findOne(id);

    let favorites = await this.favoritesRepository.findOne({
      where: { id: '1' },
    });

    if (!favorites) {
      favorites = this.favoritesRepository.create({
        id: '1',
        artists: [],
        albums: [],
        tracks: [id],
      });
    } else if (!favorites.tracks.includes(id)) {
      favorites.tracks = [...favorites.tracks, id];
    }

    await this.favoritesRepository.save(favorites);
  }

  async removeTrack(id: string): Promise<void> {
    this.logger.log(`Removing track ${id} from favorites`);
    const favorites = await this.favoritesRepository.findOne({
      where: { id: '1' },
    });

    if (!favorites || !favorites.tracks.includes(id)) {
      this.logger.warn(`Track with id ${id} not found in favorites`);
      throw new NotFoundException('Track not found in favorites');
    }

    favorites.tracks = favorites.tracks.filter((trackId) => trackId !== id);
    await this.favoritesRepository.save(favorites);
  }
}
