import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get All Orders After A Given Date', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  // test pour vérifier que si on passe une date qui ne correspond à auncune commande effectuée apres celle-ci
  it('Should return a 404 error if there are no orders existing after that date', async () => {
    const getOrdersAfterDateResponse = await request(app.getHttpServer()).get(`/api/orders/by-date-after/20-10-2023`);

    expect(getOrdersAfterDateResponse.status).toEqual(200);
    expect(getOrdersAfterDateResponse.body).toEqual([]);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
