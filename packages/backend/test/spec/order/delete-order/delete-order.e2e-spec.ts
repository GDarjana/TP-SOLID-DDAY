import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Deleting an order', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('Should return no error if the order has been deleted successfully', async () => {
    const orderId = '9c482a1b-3323-4f03-b687-97e58fec6e2e'; //<- TO CHANGE-
    const getPaidOrderResponse = await request(app.getHttpServer()).delete(`/api/orders/${orderId}`);

    expect(getPaidOrderResponse.status).toBe(200);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
