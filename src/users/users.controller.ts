import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Video } from '../videos/videos.schema'; 


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Get(':userId/recentlyViewed')
  async getRecentlyViewed(@Param('userId') userId: string): Promise<Video[]> {
    return this.usersService.getRecentlyViewed(userId);
  }
}
