import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('Comms endpoint integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns the expected payload for the canonical fixture user', async () => {
    const response = await request(app.getHttpServer()).get(
      '/comms/your-next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5',
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      title: 'Your next delivery for Dorian and Ocie',
      message:
        "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
      totalPrice: 134,
      freeGift: true,
    });
  });

  it('returns 400 when user id is not a valid UUID', async () => {
    const response = await request(app.getHttpServer()).get(
      '/comms/your-next-delivery/not-a-uuid',
    );

    expect(response.status).toBe(400);
  });

  it('returns 404 for a valid UUID that does not exist', async () => {
    const response = await request(app.getHttpServer()).get(
      '/comms/your-next-delivery/11111111-1111-4111-8111-111111111111',
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});
