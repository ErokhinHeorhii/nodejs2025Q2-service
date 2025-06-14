import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('favorites')
export class Favorites {
  @PrimaryColumn()
  id: string;

  @Column('uuid', { array: true, default: [] })
  artists: string[];

  @Column('uuid', { array: true, default: [] })
  albums: string[];

  @Column('uuid', { array: true, default: [] })
  tracks: string[];
}
