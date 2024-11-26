import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './videos.schema';

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async create(video: Video): Promise<Video> {
    const newVideo = new this.videoModel(video);
    return newVideo.save();
  }
}
