import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from '../entities/posts.entity';
import { PostsRepository } from './posts.repository';
import { UpdatePostDto } from './dto/update-post.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  createPost(createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsRepository.createPost(createPostDto);
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Posts> {
    const post = await this.postsRepository.findOne(id);

    if (!post) {
      throw new NotFoundException('해당 공고를 찾을 수 없습니다.');
    }

    const { position, compensation, tech, description } = updatePostDto;

    post.position = position;
    post.compensation = compensation;
    post.tech = tech;
    post.description = description;

    await this.postsRepository.save(post);

    return post;
  }

  async deletePost(id: number): Promise<void> {
    const result = await this.postsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('해당 공고를 찾을 수 없습니다.');
    }
  }

  async getAllPost(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }

  async getPostByKeyword(keyword: string): Promise<Posts[]> {
    return await this.postsRepository.getPostByKeyword(keyword);
  }
}
