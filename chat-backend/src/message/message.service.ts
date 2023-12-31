import { Injectable, NotFoundException } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async findAllByRoom(room_id: number, orderBy = 'asc') {
    return this.prismaService.message.findMany({
      where: { room_id },
      orderBy: { createdAt: orderBy === 'desc' ? 'desc' : 'asc' },
    });
  }

  async createMessage(
    data: Prisma.MessageUncheckedCreateInput,
  ): Promise<Message> {
    const room = await this.prismaService.room.findUnique({
      where: { id: data.room_id },
    });
    if (!room) throw new NotFoundException('Room not found');

    const user = await this.prismaService.user.findUnique({
      where: { id: data.user_id },
    });
    if (!user) throw new NotFoundException('User not found');

    return this.prismaService.message.create({ data });
  }
}
