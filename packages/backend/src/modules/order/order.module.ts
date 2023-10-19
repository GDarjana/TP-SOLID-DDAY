import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import OrderController from '@src/modules/order/presentation/controller/order.controller';
import { GetAllOrderService } from './domain/service/use-case/get-all-order.service';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';
import OrderRepository from './infrastructure/db/repository/order.repository';
import { GetAllOrderBeforeDateService } from './domain/service/use-case/get-all-order-before-date.service';
import { GetAllOrderAfterDateService } from './domain/service/use-case/get-all-order-after-date.service';
import { GetAllOrderByCustomerService } from './domain/service/use-case/get-all-order-by-customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: GetAllOrderService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new GetAllOrderService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetAllOrderBeforeDateService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new GetAllOrderBeforeDateService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetAllOrderAfterDateService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new GetAllOrderAfterDateService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetAllOrderByCustomerService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new GetAllOrderByCustomerService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
  ],
})
export default class OrderModule {}
