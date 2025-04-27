import { Body, Controller, Post, Res } from '@nestjs/common';
import { SigninDTO } from './dto/signin.dto';
import { SignupDTO } from './dto/signup.dto';
import { UsersService } from '../users/users.service';
import { Profile } from 'src/users/entities/profile.entity';
import { AuthService } from './auth.service';
import { Response } from 'express';

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
  async signin(
    @Body() sigingDTO: SigninDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.validateUser(
      sigingDTO.email,
      sigingDTO.password,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { accessToken };
  }
}
