import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Update to paid an order', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('Should return 200 if the order associated with the id has been updated to paid', async () => {
    const orderId = '9c482a1b-3323-4f03-b687-97e58fec6e2e'; //<- TO CHANGE-
    const getPaidOrderResponse = await request(app.getHttpServer()).patch(`/api/orders/${orderId}/paid`);

    expect(getPaidOrderResponse.status).toBe(200);
    expect(getPaidOrderResponse.body.status).toEqual('Paid');
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
