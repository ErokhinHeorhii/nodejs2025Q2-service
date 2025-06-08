import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'The login of the user',
    example: 'john_doe'
  })
  login: string;

  @Column()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123'
  })
  password: string;

  @Column({ default: 1 })
  @ApiProperty({
    description: 'The version of the user record',
    example: 1
  })
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'The timestamp when the user was created',
    example: 1625097600000
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'The timestamp when the user was last updated',
    example: 1625097600000
  })
  updatedAt: Date;
} 