import { User } from './user.interface';

export type UserResponse = Omit<User, 'password'>;
