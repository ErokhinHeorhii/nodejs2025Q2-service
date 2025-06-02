import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

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

  findAll() {
    const artists = this.favoriteArtists
      .map(id => {
        try {
          return this.artistsService.findOne(id);
        } catch {
          return null;
        }
      })
      .filter(artist => artist !== null);
    
    const albums = this.favoriteAlbums
      .map(id => {
        try {
          return this.albumsService.findOne(id);
        } catch {
          return null;
        }
      })
      .filter(album => album !== null);
    
    const tracks = this.favoriteTracks
      .map(id => {
        try {
          return this.tracksService.findOne(id);
        } catch {
          return null;
        }
      })
      .filter(track => track !== null);

    return {
      artists,
      albums,
      tracks,
    };
  }

  addArtist(id: string): void {
    try {
      const artist = this.artistsService.findOne(id);
      if (!this.favoriteArtists.includes(id)) {
        this.favoriteArtists.push(id);
      }
    } catch {
      throw new UnprocessableEntityException('Artist not found');
    }
  }

  addAlbum(id: string): void {
    try {
      const album = this.albumsService.findOne(id);
      if (!this.favoriteAlbums.includes(id)) {
        this.favoriteAlbums.push(id);
      }
    } catch {
      throw new UnprocessableEntityException('Album not found');
    }
  }

  addTrack(id: string): void {
    try {
      const track = this.tracksService.findOne(id);
      if (!this.favoriteTracks.includes(id)) {
        this.favoriteTracks.push(id);
      }
    } catch {
      throw new UnprocessableEntityException('Track not found');
    }
  }

  removeArtist(id: string): void {
    const index = this.favoriteArtists.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }
    this.favoriteArtists.splice(index, 1);
  }

  removeAlbum(id: string): void {
    const index = this.favoriteAlbums.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Album not found in favorites');
    }
    this.favoriteAlbums.splice(index, 1);
  }

  removeTrack(id: string): void {
    const index = this.favoriteTracks.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Track not found in favorites');
    }
    this.favoriteTracks.splice(index, 1);
  }
} 