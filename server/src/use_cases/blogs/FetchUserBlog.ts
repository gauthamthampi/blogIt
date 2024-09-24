import { Blog } from '../../domain/entities/Blog';
import { BlogRepositoryMongo } from '../../adapters/repositories/BlogRepositoryMongo';

export class FetchUserBlog {
  constructor(private blogRepository: BlogRepositoryMongo) {}

  async execute(email: string): Promise<Blog[]> {
    const blogs = await this.blogRepository.findBlogsbyEmail(email);
    return blogs; 
  }
  
}
