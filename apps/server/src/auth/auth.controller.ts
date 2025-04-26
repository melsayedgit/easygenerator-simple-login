import { Body, Controller, Post } from '@nestjs/common';
import { SigninDTO } from './dto/signin.dto';
import { SignupDTO } from './dto/signup.dto';
import { UsersService } from '../users/users.service';
import { Profile } from 'src/users/entities/profile.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() signupDTO: SignupDTO) {
    return this.usersService.create(
      signupDTO.email,
      signupDTO.password,
      signupDTO.profile as Profile,
    );
  }

  @Post('signin')
  signin(@Body() sigingDTO: SigninDTO) {
    return this.authService.validateUser(sigingDTO.email, sigingDTO.password);
  }
}
