import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../src/app.module.js';

describe('Integration: users + workouts (db)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await prisma.workout.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('creates user -> creates workout -> lists workouts', async () => {
    const uRes = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Alex', weight: 75, height: 180, goal: 'cut' })
      .expect(201);

    const userId = uRes.body.id as string;
    expect(userId).toBeTruthy();

    const wRes = await request(app.getHttpServer())
      .post('/workouts')
      .send({ userId, type: 'cardio', durationMin: 30, notes: 'easy' })
      .expect(201);

    const workoutId = wRes.body.id as string;
    expect(workoutId).toBeTruthy();

    const listRes = await request(app.getHttpServer())
      .get('/workouts')
      .query({ userId })
      .expect(200);

    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBe(1);
    expect(listRes.body[0].userId).toBe(userId);
  });

  it('returns 404 when creating workout for missing user', async () => {
    await request(app.getHttpServer())
      .post('/workouts')
      .send({ userId: 'nope', type: 'cardio', durationMin: 10 })
      .expect(404);
  });
});
