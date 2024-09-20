// use_cases/CreateUser.ts
import { User } from '../domain/entities/User';
import { UserRepositoryMongo } from '../adapters/repositories/UserRepositoryMongo';
import bcrypt from 'bcrypt'

export class CreateUser {
  constructor(private userRepository: UserRepositoryMongo) {}

  async execute(userData: User): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if(existingUser){
        throw new Error('User already exists with this email.');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userWithHashedPassword = new User(
      userData.firstname,
      userData.secondname,
      userData.email,
      hashedPassword
    );
    await this.userRepository.create(userWithHashedPassword);
  }
}
