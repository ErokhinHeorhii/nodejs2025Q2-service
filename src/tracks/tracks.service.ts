import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async findAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    try {
      const track = await this.tracksRepository.findOneBy({ id });
      if (!track) {
        throw new NotFoundException('Track not found');
      }
      return track;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Track not found');
    }
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = this.tracksRepository.create({
      ...createTrackDto,
      artist: null,
      album: null,
    });
    return this.tracksRepository.save(newTrack);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id);
    Object.assign(track, updateTrackDto);
    return this.tracksRepository.save(track);
  }

  async remove(id: string): Promise<void> {
    const result = await this.tracksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Track not found');
    }
  }
}
