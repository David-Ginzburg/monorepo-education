import { Types } from 'mongoose';

export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Student',
}

export enum PurchaseState {
  Started = 'Started',
  WaitingForPayment = 'WaitingForPayment',
  Purchased = 'Purchased',
  Cancelled = 'Cancelled',
}

export interface IUser {
  _id?: Types.ObjectId;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses?: IUserCourses[];
}

export interface IUserCourses {
  _id?: Types.ObjectId;
  courseId: string;
  purchaseState: PurchaseState;
}
