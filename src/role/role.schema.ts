import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @ApiProperty({ example: 'ADMIN', description: 'Unique user role' })
  @Prop({ unique: true })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Prop()
  description: string;

  @ApiProperty({
    example: '[usr1, usr2]',
    description: 'Users with certain role',
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
