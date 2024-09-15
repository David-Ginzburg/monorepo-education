import { Body, Controller } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { AccountChangeProfile } from '@purple/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserEntity } from './entities/user.entity';

@Controller()
export class UserCommands {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQValidate()
  @RMQRoute(AccountChangeProfile.topic)
  async userInfo(
    @Body() { user, id }: AccountChangeProfile.Request
  ): Promise<AccountChangeProfile.Response> {
    const existUser = await this.userRepository.findUserByUd(id);
    if (!existUser) {
      throw new Error('User not found');
    }
    const userEntity = new UserEntity(existUser).updateProfile(
      user.displayName
    );
    await this.userRepository.updateUser(userEntity);
    return {};
  }
}
