import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CustomLogger } from '../logging/logging.service';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    private readonly logger: CustomLogger,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    this.logger.log(`Creating new track: ${createTrackDto.name}`);
    const track = this.tracksRepository.create(createTrackDto);
    return this.tracksRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    this.logger.log('Getting all tracks');
    return this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    this.logger.log(`Finding track with id ${id}`);
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) {
      this.logger.warn(`Track with id ${id} not found`);
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    this.logger.log(`Updating track with id ${id}`);
    const track = await this.findOne(id);
    Object.assign(track, updateTrackDto);
    return this.tracksRepository.save(track);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing track with id ${id}`);
    const track = await this.findOne(id);
    await this.tracksRepository.remove(track);
  }
}
