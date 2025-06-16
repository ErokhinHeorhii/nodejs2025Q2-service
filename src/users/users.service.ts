import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserResponse } from './interfaces/user-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { CustomLogger } from '../logging/logging.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly logger: CustomLogger,
  ) {}

  private mapToResponse(user: User): UserResponse {
    const userResponse = { ...user } as any;
    delete userResponse.password;
    return userResponse;
  }

  async findAll(): Promise<UserResponse[]> {
    this.logger.log('Getting all users');
    const users = await this.usersRepository.find();
    return users.map(this.mapToResponse);
  }

  async findOne(id: string): Promise<UserResponse> {
    try {
      this.logger.log(`Finding user with id ${id}`);
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        this.logger.warn(`User with id ${id} not found`);
        throw new NotFoundException('User not found');
      }
      return this.mapToResponse(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error('Error finding user', error.stack);
      throw new NotFoundException('User not found');
    }
  }

  async create(userData: { login: string; password: string }): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    this.logger.log(`Updating user with id ${id}`);
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);
    user.password = hashedPassword;
    user.version += 1;

    const updatedUser = await this.usersRepository.save(user);
    return this.mapToResponse(updatedUser);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing user with id ${id}`);
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`User with id ${id} not found for removal`);
      throw new NotFoundException('User not found');
    }
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { login } });
  }
}
