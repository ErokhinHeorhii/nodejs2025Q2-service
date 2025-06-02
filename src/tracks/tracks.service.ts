import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { generateUuid } from '../common/utils/generate-uuid.util';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: generateUuid(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack: Track = {
      ...this.tracks[trackIndex],
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
      duration: updateTrackDto.duration,
    };

    this.tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  remove(id: string): void {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }
    this.tracks.splice(trackIndex, 1);
  }
} 