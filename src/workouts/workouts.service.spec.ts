import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { WorkoutsService } from './workouts.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('WorkoutsService (unit)', () => {
  let service: WorkoutsService;

  const prismaMock = {
    user: {
      findUnique: jest.fn<(...args: any[]) => Promise<{ id: string } | null>>(),
    },
    workout: {
      create: jest.fn<(...args: any[]) => Promise<{ id: string; userId: string }>>(),
      findMany: jest.fn<(...args: any[]) => Promise<Array<{ id: string; userId?: string }>>>(),
      findUnique: jest.fn<(...args: any[]) => Promise<{ id: string } | null>>(),
      update: jest.fn<(...args: any[]) => Promise<{ id: string; status?: string }>>(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [WorkoutsService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    service = moduleRef.get(WorkoutsService);
  });

  it('create() should create workout when user exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: 'u1' });
    prismaMock.workout.create.mockResolvedValue({ id: 'w1', userId: 'u1' });

    const res = await service.create({
      userId: 'u1',
      type: 'cardio',
      durationMin: 30,
      notes: 'easy',
    });

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { id: 'u1' } });
    expect(prismaMock.workout.create).toHaveBeenCalled();
    expect(res).toEqual({ id: 'w1', userId: 'u1' });
  });

  it('create() should throw NotFoundException when user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(
      service.create({ userId: 'u404', type: 'cardio', durationMin: 30 }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('listByUser() should return workouts ordered by createdAt desc', async () => {
    prismaMock.workout.findMany.mockResolvedValue([{ id: 'w1' }, { id: 'w2' }]);

    const res = await service.listByUser('u1');

    expect(prismaMock.workout.findMany).toHaveBeenCalledWith({
      where: { userId: 'u1' },
      orderBy: { createdAt: 'desc' },
    });
    expect(res).toEqual([{ id: 'w1' }, { id: 'w2' }]);
  });

  it('update() should update workout when it exists', async () => {
    prismaMock.workout.findUnique.mockResolvedValue({ id: 'w1' });
    prismaMock.workout.update.mockResolvedValue({ id: 'w1', status: 'DONE' });

    const res = await service.update('w1', { status: 'DONE' });

    expect(prismaMock.workout.findUnique).toHaveBeenCalledWith({ where: { id: 'w1' } });
    expect(prismaMock.workout.update).toHaveBeenCalledWith({
      where: { id: 'w1' },
      data: { status: 'DONE' },
    });
    expect(res).toEqual({ id: 'w1', status: 'DONE' });
  });

  it('update() should throw NotFoundException when workout does not exist', async () => {
    prismaMock.workout.findUnique.mockResolvedValue(null);

    await expect(service.update('w404', { status: 'DONE' })).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
