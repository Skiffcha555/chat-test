import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { UpdateUserDTO } from './models/dto/updateUserDTO';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async findOneByID(id: number): Promise<User> {
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!userExists) throw new NotFoundException('User not found');
    return userExists;
  }

  async findUserByEmail(email: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!userExists) throw new NotFoundException('User not found');
    return userExists;
  }

  async findAllByRoomID(room_id: number) {
    const room = await this.prismaService.room.findUnique({
      where: { id: room_id },
    });

    if (!room) throw new NotFoundException('Room not found');

    const users = await this.prismaService.user.findMany({
      where: { rooms: { some: { room_id } } },
    });

    return users;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      include: { rooms: true, messages: true },
    });
    return users;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const emailExists = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (emailExists)
      throw new BadRequestException('This email is already being used!');

    return this.prismaService.user.create({
      data: {
        ...data,
        password: await hash(data.password, 8),
      },
    });
  }

  async updateData({
    id,
    email,
    name,
    password,
  }: UpdateUserDTO): Promise<User> {
    await this.findOneByID(id);
    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        email,
        name,
        password,
      },
    });
    return user;
  }

  async delete(id: number): Promise<User> {
    await this.findOneByID(id);
    const deletedUser = await this.prismaService.user.delete({ where: { id } });
    return deletedUser;
  }
}
