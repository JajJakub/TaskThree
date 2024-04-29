import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsInt()
  @IsNotEmpty()
  authorId: number;

  @IsString()
  title: string;

  @IsString()
  postBody: string;
}
