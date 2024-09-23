import { Request, Response } from 'express';
import { CreateUser } from '../../use_cases/CreateUser';
import { LoginUser } from '../../use_cases/LoginUser';
import { UserData } from '../../use_cases/UserData';
import { User } from '../../domain/entities/User';
import jwt from 'jsonwebtoken';

export class UserController {
  constructor(
    private createUser: CreateUser,
    private loginUser: LoginUser,
    private userData: UserData // Inject the UserData use case here
  ) {}

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, secondname, email, password } = req.body;
      const user = new User(firstname, secondname, email, password);
      await this.createUser.execute(user);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.loginUser.execute(email, password);
      const token = jwt.sign(
        { email: user.email },
        'jwtsecret' as string,
        { expiresIn: '1h' }
      );
      res.status(200).json({ message: 'Login successful', token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async fetchUserData(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1]; 
      if (!token) throw new Error('Token not provided');

      const decoded: any = jwt.verify(token, 'jwtsecret'); 
      const email = decoded.email; 

      const user = await this.userData.execute(email); 
      res.status(200).json({
        firstname: user.firstname,
        secondname: user.secondname,
        email: user.email,
      });
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ message: 'Token expired, please log in again' });
      } else {
        res.status(401).json({ message: 'Invalid token' });
      }
    }
  }
}
