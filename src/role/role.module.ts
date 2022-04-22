import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './role.controller';
import { Role, RoleSchema } from './role.schema';
import { RoleService } from './role.service';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  exports: [RoleService],
})
export class RoleModule {}
