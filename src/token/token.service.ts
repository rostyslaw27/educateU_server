import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './token.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private jwtService: JwtService,
  ) {}
  generateTokens(payload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_SECRET_EXPIRE,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRE,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(
    userId: mongoose.Schema.Types.ObjectId,
    refreshToken: string,
  ) {
    const tokenData = await this.tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.tokenModel.deleteOne({ refreshToken });

    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ refreshToken });

    return tokenData;
  }
}
