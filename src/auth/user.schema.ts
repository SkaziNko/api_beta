import { Schema, Document } from 'mongoose';
import { SchemaFactory, Prop, Schema as MongooseSchema } from '@nestjs/mongoose';

export interface User extends Document {
  email: string;
  password: string;
  nombre: string;
}

// Esquema de usuario para MongoDB
@MongooseSchema() 
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  nombre: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
