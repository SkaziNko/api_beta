import { Controller, Get, Post, Body } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './videos.schema';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }

  @Post()
  async create(@Body() video: Video): Promise<Video> {
    return this.videosService.create(video);
  }
}
