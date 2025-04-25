import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Profile, ProfileSchema } from './profile.entity';
import * as bcrypt from 'bcrypt';
export type UserDocument = HydratedDocument<Omit<User, 'profile'>> & {
  profile?: Types.Subdocument<unknown, unknown, Profile> & Profile;
};

@Schema()
export class User {
  @Prop()
  email?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: ProfileSchema })
  profile?: Profile;

  comparePassword = async function (
    this: User,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  };
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (
  this: UserDocument,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
