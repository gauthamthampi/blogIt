import { Blog } from '../../domain/entities/Blog';
import { BlogRepositoryMongo } from '../../adapters/repositories/BlogRepositoryMongo';

interface BlogUpdateData {
  title?: string;
  content?: string;
  image?: string;
  writtenby?: string; 
}

export class UpdateBlog {
  constructor(private blogRepository: BlogRepositoryMongo) {}

  async execute(blogId: string, blogData: BlogUpdateData): Promise<void> {
    const existingBlog = await this.blogRepository.findById(blogId);

    if (!existingBlog) {
      throw new Error('Blog not found');
    }

    if (existingBlog.writtenby !== blogData.writtenby) {
      throw new Error('You are not authorized to update this blog');
    }

    if (blogData.title) existingBlog.title = blogData.title;
    if (blogData.content) existingBlog.content = blogData.content;
    if (blogData.image) existingBlog.image = blogData.image;

    await this.blogRepository.update(blogId, existingBlog);
  }
}
