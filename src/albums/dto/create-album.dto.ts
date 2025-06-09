import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the album',
    example: 'A Night at the Opera',
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    description: 'The year the album was released',
    example: 1975,
  })
  year: number;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'The ID of the artist who created the album',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  artistId: string | null;
}
