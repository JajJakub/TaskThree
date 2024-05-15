import { IsNotEmpty } from 'class-validator';

export class AddToBlacklistDto {
  @IsNotEmpty()
  refresh_token: string;

  expiration_date: Date;
}
