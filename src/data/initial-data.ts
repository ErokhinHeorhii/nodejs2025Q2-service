import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { User } from '../users/entities/user.entity';

export const initialArtists: Artist[] = [
  {
    id: '29747e9d-f3f1-4211-918e-de19a6d4298e',
    name: 'The Beatles',
    grammy: true,
  },
  {
    id: '29747e9d-f3f1-4211-918e-de19a6d4298f',
    name: 'Queen',
    grammy: true,
  },
  {
    id: '29747e9d-f3f1-4211-918e-de19a6d42990',
    name: 'Michael Jackson',
    grammy: true,
  },
  {
    id: '29747e9d-f3f1-4211-918e-de19a6d42991',
    name: 'Madonna',
    grammy: true,
  },
  {
    id: '29747e9d-f3f1-4211-918e-de19a6d42992',
    name: 'Elvis Presley',
    grammy: true,
  },
];

export const initialAlbums: Album[] = [
  {
    id: 'e222a852-eddb-4347-85a3-375afff763e6',
    name: 'Abbey Road',
    year: 1969,
    artistId: '29747e9d-f3f1-4211-918e-de19a6d4298e',
  },
  {
    id: 'e222a852-eddb-4347-85a3-375afff763e7',
    name: 'A Night at the Opera',
    year: 1975,
    artistId: '29747e9d-f3f1-4211-918e-de19a6d4298f',
  },
  {
    id: 'e222a852-eddb-4347-85a3-375afff763e8',
    name: 'Thriller',
    year: 1982,
    artistId: '29747e9d-f3f1-4211-918e-de19a6d42990',
  },
  {
    id: 'e222a852-eddb-4347-85a3-375afff763e9',
    name: 'Like a Prayer',
    year: 1989,
    artistId: '29747e9d-f3f1-4211-918e-de19a6d42991',
  },
  {
    id: 'e222a852-eddb-4347-85a3-375afff763ea',
    name: 'Elvis Presley',
    year: 1956,
    artistId: '29747e9d-f3f1-4211-918e-de19a6d42992',
  },
];

export const initialTracks: Track[] = [
  {
    id: '17ebd292-8603-439c-9bae-30c4801c7f2b',
    name: 'Come Together',
    duration: 259,
    artistId: '29747e9d-f3f1-4211-918e-de19a6d4298e',
    albumId: 'e222a852-eddb-4347-85a3-375afff763e6',
  },
  {
    id: '17ebd292-8603-439c-9bae-30c4801c7f2c',
    name: 'Bohemian Rhapsody',
    duration: 354,
    artistId: '29747e9d-f3f1-4211-918e-de19a6d4298f',
    albumId: 'e222a852-eddb-4347-85a3-375afff763e7',
  },
  {
    id: '17ebd292-8603-439c-9bae-30c4801c7f2d',
    name: 'Billie Jean',
    duration: 294,
    artistId: '29747e9d-f3f1-4211-918e-de19a6d42990',
    albumId: 'e222a852-eddb-4347-85a3-375afff763e8',
  },
  {
    id: '17ebd292-8603-439c-9bae-30c4801c7f2e',
    name: 'Like a Prayer',
    duration: 339,
    artistId: '29747e9d-f3f1-4211-918e-de19a6d42991',
    albumId: 'e222a852-eddb-4347-85a3-375afff763e9',
  },
  {
    id: '17ebd292-8603-439c-9bae-30c4801c7f2f',
    name: 'Heartbreak Hotel',
    duration: 128,
    artistId: '29747e9d-f3f1-4211-918e-de19a6d42992',
    albumId: 'e222a852-eddb-4347-85a3-375afff763ea',
  },
];

export const initialUsers: User[] = [
  {
    id: '29747e9d-f3f1-4211-918e-de19a6d42993',
    login: 'admin',
    password: 'admin',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];
