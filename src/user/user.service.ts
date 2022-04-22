import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { RoleService } from '../role/role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private roleService: RoleService,
  ) {}

  async createUser(dto: any): Promise<UserDocument> {
    const user = await this.userModel.create({ ...dto });
    const role = await this.roleService.getRoleByValue('ADMIN');

    user.roles.push(role._id);
    await user.save();
    return user;
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    return users;
  }

  async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
    const user = await this.userModel.findById(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      user.roles.push(role._id);
      await user.save();
      return dto;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userModel.findById(dto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  async activate(activationLink: string, res: Response) {
    const user = await this.userModel.findOne({ activationLink });
    if (!user) {
      throw new HttpException(
        'Incorrect activation link',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.isActivated = true;
    await user.save();
    return res.redirect(process.env.CLIENT_URL);
  }
}
