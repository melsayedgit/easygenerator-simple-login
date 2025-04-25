import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      return user;
    }
    return null;
  }
}
