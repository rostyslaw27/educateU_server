import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role, RoleDocument } from './role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role = await this.roleModel.create(dto);
    return role;
  }

  async getRoleByValue(value: string): Promise<RoleDocument> {
    const role = await this.roleModel.findOne({ value });
    return role;
  }
}
