import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<
      User,
      Record<string, never>,
      Record<string, never>,
      Record<string, never>,
      UserDocument
    >,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userModel.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const accessToken = this.jwtService.sign(
        { id: user._id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      );

      const refreshToken = this.jwtService.sign(
        { id: user._id },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      );
      return { accessToken, refreshToken };
    }
    throw new UnauthorizedException('Invalid email or password');
  }
}
