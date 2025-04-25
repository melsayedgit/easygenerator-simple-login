import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ _id: false })
export class Profile {
  @Prop({
    maxlength: 30,
  })
  name?: string;

  @Prop()
  bio?: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
