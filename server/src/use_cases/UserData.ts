import { UserRepositoryMongo } from '../adapters/repositories/UserRepositoryMongo';
import { User } from '../domain/entities/User';

export class UserData {
  constructor(private userRepository: UserRepositoryMongo) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user; 
  }
}
