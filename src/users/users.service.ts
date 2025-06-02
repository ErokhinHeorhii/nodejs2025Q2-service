import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserResponse } from './interfaces/user-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { generateUuid } from '../common/utils/generate-uuid.util';
import { initialUsers } from '../data/initial-data';

@Injectable()
export class UsersService {
  private users: User[] = [...initialUsers];

  private mapToResponse(user: User): UserResponse {
    const { password, ...userResponse } = user;
    return userResponse;
  }

  findAll(): UserResponse[] {
    return this.users.map(user => this.mapToResponse(user));
  }

  findOne(id: string): UserResponse {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.mapToResponse(user);
  }

  create(createUserDto: CreateUserDto): UserResponse {
    const newUser: User = {
      id: generateUuid(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);
    return this.mapToResponse(newUser);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): UserResponse {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    if (this.users[userIndex].password !== updatePasswordDto.oldPassword) {
      throw new BadRequestException('Old password is incorrect');
    }

    const updatedUser: User = {
      ...this.users[userIndex],
      password: updatePasswordDto.newPassword,
      version: this.users[userIndex].version + 1,
      updatedAt: Date.now(),
    };

    this.users[userIndex] = updatedUser;
    return this.mapToResponse(updatedUser);
  }

  remove(id: string): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(userIndex, 1);
  }
}
