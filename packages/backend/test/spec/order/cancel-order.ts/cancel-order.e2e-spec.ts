import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Cancel an order', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  // test pour vérifier que si un customer valid , on reçoie une 200
  it('Should return 200 if the order associated has been canceled successfully', async () => {
    const orderId = '9c482a1b-3323-4f03-b687-97e58fec6e2e'; //<- TO CHANGE-
    const getPaidOrderResponse = await request(app.getHttpServer()).patch(`/api/orders/${orderId}/cancel`);

    expect(getPaidOrderResponse.status).toBe(200);
    expect(getPaidOrderResponse.body.status).toEqual('Canceled');
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
