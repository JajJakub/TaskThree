import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'ID of user that creates the post',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({
    description: 'Title of the post',
    example: 'Title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Body of the post',
    example: 'Post Body',
  })
  @IsNotEmpty()
  @IsString()
  postBody: string;
}
