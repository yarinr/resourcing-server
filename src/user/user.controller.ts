import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, CreateUserDTO } from '../entities';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async create(
    @Body('variables') data: { createUserDto: CreateUserDTO },
  ): Promise<User> {
    return this.userService.register(data.createUserDto);
  }
}
