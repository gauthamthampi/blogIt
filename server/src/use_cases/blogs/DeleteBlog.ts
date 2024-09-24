import { Blog } from '../../domain/entities/Blog';
import { BlogRepositoryMongo } from '../../adapters/repositories/BlogRepositoryMongo';

export class DeleteBlog {
  constructor(private blogRepository: BlogRepositoryMongo) {}

  async execute(id:string): Promise<void> {
    await this.blogRepository.deleteBlogbyId(id);
  }
}
