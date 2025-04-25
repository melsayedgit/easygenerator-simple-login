import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ _id: false })
export class Profile {
  @Prop({
    maxlength: 20,
    validate: {
      validator: (username: string) => /^[\w.-]+$/.test(username),
      message: (props: { value: string }) =>
        `username:${props.value} contains invalid characters!,
         you can only use only allows safe, unencoded URL elements,
         alphabet,digits,"-","_","." and no whitespaces`,
    },
  })
  username?: string;

  @Prop({
    maxlength: 30,
  })
  name?: string;

  @Prop()
  bio?: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

ProfileSchema.index(
  { username: 1 },
  { unique: true, sparse: true, collation: { locale: 'en', strength: 2 } },
);
