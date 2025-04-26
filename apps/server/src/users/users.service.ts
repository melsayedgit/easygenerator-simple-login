import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
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
  async create(
    email: string,
    password: string,
    profile: Profile,
  ): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    return this.userModel.create({ email, password, profile });
  }
}
