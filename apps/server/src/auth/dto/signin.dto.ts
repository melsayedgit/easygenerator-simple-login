import { IsString, Length, IsEmail } from 'class-validator';

export class SigninDTO {
  @IsString()
  @Length(3, 255)
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
