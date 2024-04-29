import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('addPost')
  async addPost(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    return this.postsService.addPost(createPostDto);
  }

  @Get('findAll')
  findAll() {
    return this.postsService.findAll();
  }
}
