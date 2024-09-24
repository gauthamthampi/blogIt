import { Blog } from '../../domain/entities/Blog';
import { BlogRepositoryMongo } from '../../adapters/repositories/BlogRepositoryMongo';

export class FetchSingleBlog {
  constructor(private blogRepository: BlogRepositoryMongo) {}

  async execute(id: string): Promise<Blog | null> {
    const blogs = await this.blogRepository.findById(id);  
    return blogs; 
  }
}
