import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @ApiProperty({
    example: 'User Id',
    description: 'The user to whom the token belongs',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @ApiProperty({
    example: 'e3473jjdmdiw29d9ik2ee',
    description: 'Refresh token which relates to access token',
  })
  @Prop({ required: true })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
