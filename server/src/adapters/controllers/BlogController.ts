import { Request, Response } from 'express';
import { Blog } from '../../domain/entities/Blog';
import { CreateBlog } from '../../use_cases/blogs/CreateBlog';
import { FetchAllBlog } from '../../use_cases/blogs/FetchAllBlog';
import { FetchUserBlog } from '../../use_cases/blogs/FetchUserBlog';
import { UpdateBlog} from '../../use_cases/blogs/EditBlog';
import { FetchSingleBlog } from '../../use_cases/blogs/FetchSingleBlog';
import jwt from 'jsonwebtoken'

export class BlogController {
  constructor(
    private createBlog: CreateBlog,
    private updateBlog: UpdateBlog,
    private fetchAllBlogs: FetchAllBlog,
    private fetchUserBlogs: FetchUserBlog,
    private fetchSingleBlogs: FetchSingleBlog
  ) {}

  async CreateBlog(req: Request, res: Response): Promise<void | Response> {
    try {
      const token = req.headers.authorization?.split(' ')[1]; 
      if (!token) throw new Error('Token not provided');

      const decoded: any = jwt.verify(token, 'jwtsecret'); 
      const email = decoded.email; 
      const { title, content, writtenby, createdAt } = req.body;

      const image = req.file ? `/uploads/${req.file.filename}` : null;

      if (!image) {
        return res.status(400).json({ message: 'Image is required' }); 
      }

      const blog = new Blog(title, content, image, writtenby, createdAt);

      await this.createBlog.execute(blog);

      return res.status(201).json({ message: 'Blog created successfully' });  
    } catch (error: any) {
      return res.status(400).json({ message: error.message });  
    }
  }

  async UpdateBlog(req: Request, res: Response): Promise<void | Response> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) throw new Error('Token not provided');

      const decoded: any = jwt.verify(token, 'jwtsecret'); 
      const email = decoded.email; 

      const { title, content } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : undefined; 

      const blogId = req.params.id; 

      const blogUpdateData = {
        title,
        content,
        image,
        writtenby: email, 
      };

      await this.updateBlog.execute(blogId, blogUpdateData);
   
      return res.status(201).json();  
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async FetchAllBlogs(req: Request, res:Response): Promise<void | Response> {
    try{
      const blogs = await this.fetchAllBlogs.execute()
      return res.status(201).json(blogs);  
    }catch(error: any){
      return res.status(400).json({ message: error.message });  
    }
  }

  async FetchUserBlogs(req: Request, res:Response): Promise<void | Response>{
    try{
      const token = req.headers.authorization?.split(' ')[1]; 
      if (!token) throw new Error('Token not provided');
      const decoded: any = jwt.verify(token, 'jwtsecret'); 
      const email = decoded.email; 
      const blogs = await this.fetchUserBlogs.execute(email)
      return res.status(201).json(blogs);  
    }catch(error:any){
      return res.status(400).json({ message: error.message });  
    }
  }

  async FetchSingleBlog(req: Request, res:Response): Promise<void | Response>{
    try{
      const token = req.headers.authorization?.split(' ')[1]; 
      if (!token) throw new Error('Token not provided');
      const decoded: any = jwt.verify(token, 'jwtsecret'); 
      const id = req.params.id      
      const blog = await this.fetchSingleBlogs.execute(id)
      return res.status(201).json(blog)
     }catch(error:any){
      return res.status(400).json({ message: error.message });  
     }
  } 
}
