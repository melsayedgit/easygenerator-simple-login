import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/entities/user.entity';

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
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid email or password');
  }
}
