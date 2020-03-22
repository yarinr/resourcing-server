import { Controller, Get, Param, Post, Body } from '@nestjs/common';
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
  async create(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return this.userService.register(createUserDto);
  }
}
