import { UserRepositoryMongo } from '../adapters/repositories/UserRepositoryMongo';
import { User } from '../domain/entities/User';
import bcrypt from 'bcrypt';

export class LoginUser {
  constructor(private userRepository: UserRepositoryMongo) {}

  async execute(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }
}
