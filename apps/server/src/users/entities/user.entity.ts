import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Profile, ProfileSchema } from './profile.entity';

export type UserDocument = HydratedDocument<Omit<User, 'profile'>> & {
  profile?: Types.Subdocument<unknown, unknown, Profile> & Profile;
};

@Schema()
export class User {
  @Prop()
  email?: string;
  @Prop({ type: ProfileSchema })
  profile?: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
