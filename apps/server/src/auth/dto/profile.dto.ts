import { IsString, Length } from 'class-validator';

export class ProfileDTO {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsString()
  bio?: string;
}
