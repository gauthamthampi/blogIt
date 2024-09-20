import mongoose, { Document, model, Schema } from 'mongoose';
import { User } from '../../domain/entities/User';

interface IUserDocument extends User, Document {}

const userSchema = new Schema<IUserDocument>({
  firstname: { type: String },
  secondname: { type: String,  },
  email: { type: String,  },
  password: { type: String, }, // Store hashed password
});

const UserModel = model<IUserDocument>('User', userSchema);

export class UserRepositoryMongo {
  async create(user: User): Promise<IUserDocument> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async findByEmail(email:string): Promise<IUserDocument | null>{
    return await UserModel.findOne({email}).exec()
  }
}
