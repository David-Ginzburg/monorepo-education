import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PurchaseState, UserRole } from '@purple/interfaces';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ _id: true })
export class UserCourses {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true, enum: PurchaseState, type: String })
  purchaseState: PurchaseState;
}

export const UserCoursesSchema = SchemaFactory.createForClass(UserCourses);
@Schema({ _id: true })
export class UserModel {
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

  @Prop({ type: [UserCoursesSchema], _id: false })
  courses: Types.Array<UserCourses>;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
