import { AccountChangedCourse } from '@purple/contracts';
import {
  IDomainEvent,
  IUser,
  IUserCourses,
  PurchaseState,
  UserRole,
} from '@purple/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';
import { Types } from 'mongoose';

export class UserEntity implements IUser {
  _id?: Types.ObjectId;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses: IUserCourses[];
  events: IDomainEvent[] = [];

  constructor(user: IUser) {
    this._id = user._id;
    this.passwordHash = user.passwordHash;
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;
    this.courses = user.courses;
  }

  public setCourseStatus(courseId: string, state: PurchaseState) {
    const exist = this.courses.find((course) => course.courseId === courseId);

    if (!exist) {
      this.courses.push({ courseId, purchaseState: state });
      return this;
    }

    if (state === PurchaseState.Cancelled) {
      this.courses = this.courses.filter(
        (course) => course.courseId !== courseId
      );
      return this;
    }

    this.courses = this.courses.map((courses) => {
      if (courses.courseId === courseId) {
        courses.purchaseState = state;
        return courses;
      }

      return courses;
    });

    this.events.push({
      topic: AccountChangedCourse.topic,
      data: { courseId, userId: this._id, state },
    });

    return this;
  }

  public getPublicProfile() {
    return {
      email: this.email,
      role: this.role,
      displayName: this.displayName,
    };
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }

  public updateProfile(displayName: string) {
    this.displayName = displayName;
    return this;
  }
}
