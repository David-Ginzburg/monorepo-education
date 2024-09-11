import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string | undefined;

  @IsString()
  password: string | undefined;

  @IsOptional()
  @IsString()
  displayName?: string;
}
