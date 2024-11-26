import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';  
import { Video } from '../videos/videos.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';  
import { JwtService } from '@nestjs/jwt';  

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Video.name) private videoModel: Model<Video>,  
    private jwtService: JwtService,
  ) {}

    // Método para crear un nuevo usuario (registro)
    async register(createUserDto: CreateUserDto): Promise<User> {
      const { password } = createUserDto;
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      return newUser.save();
    }
  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Obtener un usuario por su id
  async findOneById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  // Obtener un usuario por su correo electrónico (para login)
  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
   // Método para obtener los videos vistos recientemente por un usuario
   async getRecentlyViewed(userId: string): Promise<Video[]> {
    const user = await this.userModel
    .findById(userId)
    .populate('recentlyViewed')
    .exec();
    return user ? (user.recentlyViewed as unknown as Video []) : []; // Devuelve los videos recientemente vistos
  }

  // Autenticación y generar un JWT
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  // Generar JWT para el usuario
  async generateJwt(user: User) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Actualizar usuario
  async update(userId: string, updateUserDto: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec();
  }

  // Eliminar usuario
  async remove(userId: string): Promise<any> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
