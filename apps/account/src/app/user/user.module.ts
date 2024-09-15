import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { UserCommands } from './user.commands';
import { UserQueries } from './user.queries';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
  controllers: [UserCommands, UserQueries],
})
export class UserModule {}
