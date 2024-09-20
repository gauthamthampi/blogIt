
import { Router } from 'express';
import { UserController } from '../../../adapters/controllers/UserController';
import { CreateUser } from '../../../use_cases/CreateUser';
import { UserRepositoryMongo } from '../../../adapters/repositories/UserRepositoryMongo';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { LoginUser } from '../../../use_cases/LoginUser';

dotenv.config();

const router = Router();

const userRepository = new UserRepositoryMongo();
const createUser = new CreateUser(userRepository);
const loginUser = new LoginUser(userRepository)
const userController = new UserController(createUser,loginUser);


router.post('/api/signup', (req, res) => userController.signup(req, res));
router.post('/api/login',(req,res)=> userController.login(req,res))

export default router;
