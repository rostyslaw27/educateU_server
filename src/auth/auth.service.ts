import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../user/user.schema';
import { Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { TokenService } from 'src/token/token.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
    private mailService: MailService,
    private tokenService: TokenService,
  ) {}

  async registration(userDto: CreateUserDto, res: Response) {
    const candidate = await this.userModel.findOne({ email: userDto.email });

    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const activationLink = uuidv4();

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
      activationLink,
    });

    await this.mailService.sendActivationMail(
      userDto.email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    );

    const { refreshToken, accessToken } = this.tokenService.generateTokens({
      email: user.email,
      id: user._id,
      roles: user.roles,
    });

    await this.tokenService.saveToken(user._id, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json({
      token: accessToken,
      email: userDto.email,
    });
  }

  async login(userDto: CreateUserDto, res: Response) {
    const user = await this.validateUser(userDto);

    const { refreshToken, accessToken } = this.tokenService.generateTokens({
      email: user.email,
      id: user._id,
      roles: user.roles,
    });

    await this.tokenService.saveToken(user._id, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json({
      token: accessToken,
      email: userDto.email,
    });
  }

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const token = await this.tokenService.removeToken(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }

    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = this.tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }

    const user = await this.userModel.findById(userData.id);
    const tokens = this.tokenService.generateTokens({
      email: user.email,
      id: user._id,
      roles: user.roles,
    });
    await this.tokenService.saveToken(user._id, tokens.refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json({
      token: tokens.accessToken,
      email: user.email,
    });
  }

  private async validateUser(userDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email: userDto.email });

    if (!user) {
      throw new HttpException(
        'User with this email doesnt exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPassEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && isPassEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Incorrect email or password',
    });
  }
}
