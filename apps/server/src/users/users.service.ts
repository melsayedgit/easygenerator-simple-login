import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

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
  async findOne(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    return user;
  }
}
