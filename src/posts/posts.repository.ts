import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from '../entities/posts.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {
  async createPost(createPostDto: CreatePostDto): Promise<Posts> {
    const { company_id, position, compensation, tech, description } =
      createPostDto;

    const company = await this.createQueryBuilder()
      .select('company')
      .from('Company', 'company')
      .where('company.id = :id', { id: company_id })
      .getOne();

    const post: Posts = this.create({
      company,
      position,
      compensation,
      tech,
      description,
    });

    // const result = this.createQueryBuilder()
    //   .insert('')

    await this.save(post);
    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Posts> {
    const { position, compensation, tech, description } = updatePostDto;

    const post = await this.createQueryBuilder()
      .update(Posts)
      .set({ position, compensation, tech, description })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return post.raw[0];
  }

  async getPostByKeyword(keyword: string): Promise<Posts[]> {
    const posts = await this.createQueryBuilder('posts')
      .where('posts.country LIKE :text', { text: `%${keyword}%` })
      .orWhere('posts.region LIKE :text', { text: `%${keyword}%` })
      .orWhere('posts.position LIKE :text', { text: `%${keyword}%` })
      .orWhere('posts.tech LIKE :text', { text: `%${keyword}%` })
      .orWhere('posts.description LIKE :text', { text: `%${keyword}%` })
      .getMany();

    return posts;
  }
}
