import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from '../entities/posts.entity';
import { PostsService } from './posts.service';
import { Put } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { ParseIntPipe } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Query } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsService.createPost(createPostDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Posts> {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete('/:id')
  deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postsService.deletePost(id);
  }

  @Get('/')
  getAllPost(): Promise<Posts[]> {
    return this.postsService.getAllPost();
  }

  @Get('/search')
  getPostByKeyword(@Query('keyword') keyword: string): Promise<Posts[]> {
    return this.postsService.getPostByKeyword(keyword);
  }
}
