import {Request, Response} from 'express'
import {CreateUser} from '../../use_cases/CreateUser';
import { LoginUser } from '../../use_cases/LoginUser';
import { User } from '../../domain/entities/User';
import jwt from 'jsonwebtoken'

export class UserController {
    constructor(private createUser: CreateUser, private loginUser: LoginUser) {}
  
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

    async login(req:Request,res:Response): Promise<void> {
      try{
        const {email,password} = req.body
        const user = await this.loginUser.execute(email,password)
        const token = jwt.sign(
          { email: user.email }, 
          'jwtsecret' as string,    
          { expiresIn: '1h' }                   
        );
        res.status(200).json({message:'Login successfull',token})
      } catch(error : any){
        res.status(401).json({message:error.message})
      }
    }
  }
    
