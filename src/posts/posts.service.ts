import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    private usersService: UsersService,
  ) {}

  async addPost(createPostDto: CreatePostDto) {
    const user = await this.usersService.getUserById(createPostDto.authorId);
    const post: PostEntity = new PostEntity();
    post.postBody = createPostDto.postBody;
    post.title = createPostDto.title;
    post.author = user;

    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find();
  }
}
