import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const getMongoConfig = (): MongooseModuleAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const uri = configService.get<string>(
      process.env.NODE_ENV === 'docker' ? 'MONGO_DOCKER_URI' : 'MONGO_LOCAL_URI'
    );

    return {
      uri,
      user: configService.get<string>('MONGO_INITDB_ROOT_USERNAME'),
      pass: configService.get<string>('MONGO_INITDB_ROOT_PASSWORD'),
      authSource: 'admin',
    };
  },
  inject: [ConfigService],
});
