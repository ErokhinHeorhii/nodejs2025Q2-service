import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './entities/favorites.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  async findAll() {
    const favorites = await this.favoritesRepository.findOne({
      where: { id: '1' },
    });
    if (!favorites) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }
    return favorites;
  }

  async addArtist(id: string) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

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
    } else {
      favorites.artists = [...favorites.artists, id];
    }

    return this.favoritesRepository.save(favorites);
  }

  async removeArtist(id: string) {
    const favorites = await this.favoritesRepository.findOne({
      where: { id: '1' },
    });
    if (!favorites) {
      throw new NotFoundException('Favorites not found');
    }

    favorites.artists = favorites.artists.filter((artistId) => artistId !== id);
    return this.favoritesRepository.save(favorites);
  }

  async addAlbum(id: string) {
    const album = await this.albumsService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

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
    } else {
      favorites.albums = [...favorites.albums, id];
    }

    return this.favoritesRepository.save(favorites);
  }

  async removeAlbum(id: string) {
    const favorites = await this.favoritesRepository.findOne({
      where: { id: '1' },
    });
    if (!favorites) {
      throw new NotFoundException('Favorites not found');
    }

    favorites.albums = favorites.albums.filter((albumId) => albumId !== id);
    return this.favoritesRepository.save(favorites);
  }

  async addTrack(id: string) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

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
    } else {
      favorites.tracks = [...favorites.tracks, id];
    }

    return this.favoritesRepository.save(favorites);
  }

  async removeTrack(id: string) {
    const favorites = await this.favoritesRepository.findOne({
      where: { id: '1' },
    });
    if (!favorites) {
      throw new NotFoundException('Favorites not found');
    }

    favorites.tracks = favorites.tracks.filter((trackId) => trackId !== id);
    return this.favoritesRepository.save(favorites);
  }
}
