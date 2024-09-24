import { Blog } from '../../domain/entities/Blog';
import { BlogRepositoryMongo } from '../../adapters/repositories/BlogRepositoryMongo';

export class CreateBlog {
  constructor(private blogRepository: BlogRepositoryMongo) {}

  async execute(blogData: Blog): Promise<void> {
   
    const newBlog = new Blog(
     blogData.title,
     blogData.content,
     blogData.image,
     blogData.writtenby,
     blogData.createdAt
    );
    await this.blogRepository.create(newBlog);
  }
}
