import { IsString, Length, Matches, IsEmail } from 'class-validator';

export class SignupDTO {
  @IsString()
  @Length(3, 255)
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 255, {
    message: 'Password is too short. Minimum length is 8 characters.',
  })
  @Matches(/(?=.*[a-zA-Z])/, {
    message: 'Password must contain at least one letter.',
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'Password must contain at least one number.',
  })
  @Matches(/(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])/, {
    message: 'Password must contain at least one special character.',
  })
  password: string;
}
