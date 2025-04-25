import { Body, Controller, Post } from '@nestjs/common';
import { SigninDTO } from './dto/signin.dto';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  signup(@Body() SignupDTO: { email: string; password: string }) {
    return 'signup';
  }
  @Post('signin')
  signin(@Body() SigninDTO: { email: string; password: string }) {
    return 'signin';
  }
}
