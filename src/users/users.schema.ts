import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Video } from '../videos/videos.schema'; 

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Video' }] })
  recentlyViewed: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
