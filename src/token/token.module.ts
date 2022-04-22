import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './token.schema';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  exports: [TokenService, JwtModule],
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SECRET',
    }),
  ],
})
export class TokenModule {}
