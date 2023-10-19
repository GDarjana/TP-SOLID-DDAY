import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get All Orders', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('Should return no orders of there are none in the db', async () => {
    const getOrders = await request(app.getHttpServer()).get(`/api/orders`);
    expect(getOrders.status).toEqual(200);
    expect(getOrders.body).toEqual([]);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
