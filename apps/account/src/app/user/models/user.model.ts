import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser, UserRole } from '@purple/interfaces';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ _id: true })
export class UserModel extends Document implements IUser {
  @Prop()
  _id?: string;

  @Prop()
  displayName?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({
    required: true,
    enum: UserRole,
    type: String,
    default: UserRole.Student,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
