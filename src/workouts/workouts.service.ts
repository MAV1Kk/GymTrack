import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateWorkoutDto } from './dto/create-workout.dto.js';
import { UpdateWorkoutDto } from './dto/update-workout.dto.js';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateWorkoutDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.workout.create({
      data: {
        userId: dto.userId,
        type: dto.type,
        durationMin: dto.durationMin,
        notes: dto.notes,
      },
    });
  }

  listByUser(userId: string) {
    return this.prisma.workout.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, dto: UpdateWorkoutDto) {
    const w = await this.prisma.workout.findUnique({ where: { id } });
    if (!w) throw new NotFoundException('Workout not found');

    return this.prisma.workout.update({ where: { id }, data: dto });
  }
}
