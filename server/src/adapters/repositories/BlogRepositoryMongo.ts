import mongoose, { Document, model, Schema } from 'mongoose';
import { Blog } from '../../domain/entities/Blog';

interface IUserDocument extends Blog, Document {}

const blogSchema = new Schema<IUserDocument>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  writtenby: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, 
});

const BlogModel = model<IUserDocument>('Blog', blogSchema);

export class BlogRepositoryMongo {
  async create(blog: Blog): Promise<IUserDocument> {
    const newBlog = new BlogModel(blog);
    return await newBlog.save();
  }

  async update(blogId: string, blogData: Blog): Promise<IUserDocument | null> {
    return await BlogModel.findByIdAndUpdate(blogId, blogData, { new: true }).exec();
  }

  async findById(blogId: string): Promise<IUserDocument | null> {
    return await BlogModel.findById(blogId).exec();
  }

  async findBlogs(): Promise<IUserDocument[]> {
    return await BlogModel.find({}).exec(); 
  }

  async findBlogsbyEmail(email: string): Promise<Blog[]> {
    return await BlogModel.find({ writtenby: email }).exec(); // Ensure this returns an array
  }

}
