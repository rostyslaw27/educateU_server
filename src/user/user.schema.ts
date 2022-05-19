import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../role/role.schema';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Course } from 'src/course/course.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @Prop({ unique: true })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Prop()
  password: string;

  @ApiProperty({ example: 'true', description: 'Banned or not' })
  @Prop({ default: false })
  banned: boolean;

  @ApiProperty({ example: 'For spam', description: 'Ban reason' })
  @Prop()
  banReason: string;

  @ApiProperty({ example: 'True', description: 'User activation' })
  @Prop({ default: false })
  isActivated: boolean;

  @ApiProperty({ example: 'Activation link', description: 'Activation link' })
  @Prop()
  activationLink: string;

  @ApiProperty({ example: 'ADMIN', description: 'User roles' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];

  @ApiProperty({
    example: 'Purchased Courses List',
    description: 'Purchased Courses List',
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  purchasedCourses: Course[];

  @ApiProperty({
    example: 'Created Courses List',
    description: 'Created Courses List',
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  createdCourses: Course[];
}

export const UserSchema = SchemaFactory.createForClass(User);
