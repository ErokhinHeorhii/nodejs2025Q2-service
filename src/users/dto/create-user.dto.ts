import { IsString, IsNotEmpty, IsUUID, IsInt, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsInt()
  @Min(4)
  @Max(130)
  age: number;

  @IsString()
  @IsNotEmpty()
  hobbies: string[];

  login: string;
  password: string;
}
