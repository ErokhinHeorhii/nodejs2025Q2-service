import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { FavoritesResponse } from './interfaces/favorites-response.interface';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  private favoriteArtists: string[] = [];
  private favoriteAlbums: string[] = [];
  private favoriteTracks: string[] = [];

  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  findAll(): FavoritesResponse {
    return {
      artists: this.favoriteArtists.map(id => this.artistsService.findOne(id)),
      albums: this.favoriteAlbums.map(id => this.albumsService.findOne(id)),
      tracks: this.favoriteTracks.map(id => this.tracksService.findOne(id)),
    };
  }

  addArtist(id: string): void {
    try {
      this.artistsService.findOne(id);
      if (!this.favoriteArtists.includes(id)) {
        this.favoriteArtists.push(id);
      }
    } catch (error) {
      throw new UnprocessableEntityException('Artist not found');
    }
  }

  removeArtist(id: string): void {
    const index = this.favoriteArtists.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }
    this.favoriteArtists.splice(index, 1);
  }

  addAlbum(id: string): void {
    try {
      this.albumsService.findOne(id);
      if (!this.favoriteAlbums.includes(id)) {
        this.favoriteAlbums.push(id);
      }
    } catch (error) {
      throw new UnprocessableEntityException('Album not found');
    }
  }

  removeAlbum(id: string): void {
    const index = this.favoriteAlbums.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Album not found in favorites');
    }
    this.favoriteAlbums.splice(index, 1);
  }

  addTrack(id: string): void {
    try {
      this.tracksService.findOne(id);
      if (!this.favoriteTracks.includes(id)) {
        this.favoriteTracks.push(id);
      }
    } catch (error) {
      throw new UnprocessableEntityException('Track not found');
    }
  }

  removeTrack(id: string): void {
    const index = this.favoriteTracks.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Track not found in favorites');
    }
    this.favoriteTracks.splice(index, 1);
  }
} 