import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Video extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  thumbnail: string;

  @Prop()
  category: string;

  @Prop({ default: Date.now })
  uploadedAt: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
