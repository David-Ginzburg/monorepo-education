import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from '../models/user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>
  ) {}

  async createUser(user: UserEntity) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateUser({ _id, ...rest }: UserEntity) {
    return this.userModel.updateOne({ _id }, { $set: { ...rest } }).exec();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserByUd(id: string) {
    return this.userModel.findById(id).exec();
  }

  async deleteUser(email: string) {
    return this.userModel.findOneAndDelete({ email }).exec();
  }
}
