import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { isNumber, isNumberString } from 'class-validator';
import { UpdatePostDto } from './dto/update-post.dto';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('addPost')
  async addPost(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    try {
      return this.postsService.addPost(createPostDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('all')
  findAll() {
    return this.postsService.findAll();
  }

  @Get('user/:id')
  findUserPosts(@Param('id') id: number) {
    if (!isNumberString(id))
      throw new BadRequestException('ID has to be a number');

    try {
      return this.postsService.findByUser(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('update')
  updatePost(@Body(ValidationPipe) updatePostDto: UpdatePostDto) {
    try {
      return this.postsService.updatePost(updatePostDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('delete')
  deletePost(@Body(ValidationPipe) deletePostDto: UpdatePostDto) {
    return this.postsService.deletePost(deletePostDto);
  }
}
