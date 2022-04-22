import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsString({ message: 'Email should be string' })
  @IsEmail({}, { message: 'Incorrect email pattern' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString({ message: 'Password should be string' })
  @Length(4, 16, {
    message: 'Password should be longer than 4 and less than 16',
  })
  readonly password: string;
}
