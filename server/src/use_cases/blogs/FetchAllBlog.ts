import { Blog } from '../../domain/entities/Blog';
import { BlogRepositoryMongo } from '../../adapters/repositories/BlogRepositoryMongo';

export class FetchAllBlog {
  constructor(private blogRepository: BlogRepositoryMongo) {}

  async execute(): Promise<Blog[]> {
    const blogs = await this.blogRepository.findBlogs();
    return blogs; 
  }

}

