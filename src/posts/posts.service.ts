import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    private usersService: UsersService,
  ) {}

  async addPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    const user: UserEntity = await this.usersService.getUserById(
      createPostDto.authorId,
    );
    if (!user)
      throw new NotFoundException('User with this ID does not exists!');

    const post: PostEntity = new PostEntity();
    post.postBody = createPostDto.postBody;
    post.title = createPostDto.title;
    post.author = user;

    return this.postRepository.save(post);
  }

  findAll(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  async findByUser(userId: number): Promise<PostEntity[]> {
    const user: UserEntity = await this.usersService.getUserById(userId);
    if (!user)
      throw new NotFoundException('User with this ID does not exists!');

    return this.postRepository.find({
      where: {
        author: user,
      },
    });
  }

  async updatePost(updateDto: UpdatePostDto): Promise<PostEntity> {
    const user: UserEntity = await this.usersService.getUserById(
      updateDto.authorId,
    );
    if (!user)
      throw new NotFoundException('User with this ID does not exists!');

    const post: PostEntity = await this.postRepository.findOne({
      where: {
        author: user,
        id: updateDto.postId,
      },
    });
    if (!post)
      throw new NotFoundException(
        'User with this ID does not have post with provided ID',
      );

    if (updateDto.title && updateDto.title !== post.title)
      post.title = updateDto.title;

    if (updateDto.postBody && updateDto.postBody !== post.postBody)
      post.postBody = updateDto.postBody;

    return this.postRepository.save(post);
  }

  async deletePost(deleteDto: UpdatePostDto) {
    const user: UserEntity = await this.usersService.getUserById(
      deleteDto.authorId,
    );
    if (!user)
      throw new NotFoundException('User with this ID does not exists!');

    const post: PostEntity = await this.postRepository.findOne({
      where: {
        author: user,
        id: deleteDto.postId,
      },
    });
    if (!post)
      throw new NotFoundException(
        'User with this ID does not own post with provided ID or that post has been removed',
      );
    return this.postRepository.delete(deleteDto.postId);
  }
}
