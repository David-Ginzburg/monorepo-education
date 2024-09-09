import { IsEmail, IsOptional, IsString } from 'class-validator';

export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    @IsEmail()
    email: string | undefined;

    @IsString()
    password: string | undefined;

    @IsOptional()
    @IsString()
    displayName?: string;
  }

  export class Response {
    email: string | undefined;
  }
}
