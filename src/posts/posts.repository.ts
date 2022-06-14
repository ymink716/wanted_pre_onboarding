import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from '../entities/posts.entity';

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {
  async createPost(createPostDto: CreatePostDto): Promise<Posts> {
    const { country, region, position, compensation, tech, description } =
      createPostDto;

    const post: Posts = new Posts();
    post.country = country;
    post.region = region;
    post.position = position;
    post.compensation = compensation;
    post.tech = tech;
    post.description = description;

    await this.save(post);

    return post;
  }
}
