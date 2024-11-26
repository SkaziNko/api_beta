import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

dotenv.config();  

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot('mongodb+srv://skazinko:alinko2223@betaapp.7n3s2.mongodb.net/betaApp'),
    AuthModule,  
  ],
})

@Module({
  imports: [HomeModule],
})
export class AppModule {}



