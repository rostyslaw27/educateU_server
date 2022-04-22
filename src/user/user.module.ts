import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RoleModule,
    TokenModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
