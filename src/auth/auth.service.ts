import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = 'super-secret'; // В реальном приложении должно быть в .env

  constructor(
    private readonly usersService: UsersService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { login, password } = signupDto;

    // Проверяем, не существует ли уже пользователь с таким логином
    const existingUser = await this.usersService.findByLogin(login);
    if (existingUser) {
      throw new ConflictException('User with this login already exists');
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const user = await this.usersService.create({
      login,
      password: hashedPassword,
    });

    // Генерируем JWT токен
    const payload = { userId: user.id, login: user.login };
    const accessToken = jwt.sign(payload, this.JWT_SECRET, { expiresIn: '1h' });

    return {
      accessToken,
    };
  }
} 