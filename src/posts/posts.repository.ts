import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from '../entities/posts.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { NotFoundException } from '@nestjs/common';

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

    if (!company) {
      throw new NotFoundException('존재하지 않는 회사입니다.');
    }

    const post: Posts = this.create({
      company,
      position,
      compensation,
      tech,
      description,
    });

    await this.save(post);
    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Posts> {
    const { position, compensation, tech, description } = updatePostDto;

    const result: UpdateResult = await this.createQueryBuilder()
      .update(Posts)
      .set({ position, compensation, tech, description })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException('해당 공고를 찾을 수 없습니다.');
    }

    return result.raw[0];
  }

  async getPostByKeyword(keyword: string): Promise<Posts[]> {
    const posts = await this.createQueryBuilder('posts')
      .select([
        'posts.id',
        'posts.position',
        'posts.compensation',
        'posts.tech',
        'company.name',
        'company.country',
        'company.region',
      ])
      .innerJoin('posts.company', 'company')
      .where('company.name LIKE :text', { text: `%${keyword}%` })
      .orWhere('company.country LIKE :text', { text: `%${keyword}%` })
      .orWhere('company.region LIKE :text', { text: `%${keyword}%` })
      .orWhere('posts.position LIKE :text', { text: `%${keyword}%` })
      .orWhere('posts.tech LIKE :text', { text: `%${keyword}%` })
      .orWhere('posts.description LIKE :text', { text: `%${keyword}%` })
      .getMany();

    return posts;
  }
}
