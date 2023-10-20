import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import OrderController from '@src/modules/order/presentation/controller/order.controller';
import { GetAllOrdersService } from './domain/service/use-case/get-all-orders.service';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';
import OrderRepository from './infrastructure/db/repository/order.repository';
import { GetAllOrdersBeforeDateService } from './domain/service/use-case/get-all-orders-before-date.service';
import { GetAllOrdersAfterDateService } from './domain/service/use-case/get-all-orders-after-date.service';
import { GetAllOrdersByCustomerService } from './domain/service/use-case/get-all-orders-by-customer.service';
import OrderDateStringToDateConverterService from './domain/service/utils/order-date-string-to-date-converter.service';
import { PayOrderService } from './domain/service/use-case/pay-order.service';
import { CancelOrderService } from './domain/service/use-case/cancel-order.service';
import { DeleteOrderService } from './domain/service/use-case/delete-order.service';
import { CreateOrderService } from './domain/service/use-case/create-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: GetAllOrdersService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: 'OrderDateStringToDateConverter',
      useClass: OrderDateStringToDateConverterService,
    },
    {
      provide: GetAllOrdersBeforeDateService,
      useFactory: (OrderRepository: OrderRepositoryInterface, OrderDateStringToDateConverter: OrderDateStringToDateConverterService) => {
        return new GetAllOrdersBeforeDateService(OrderRepository, OrderDateStringToDateConverter);
      },
      inject: ['OrderRepositoryInterface', 'OrderDateStringToDateConverter'],
    },

    {
      provide: GetAllOrdersAfterDateService,
      useFactory: (OrderRepository: OrderRepositoryInterface, OrderDateStringToDateConverter: OrderDateStringToDateConverterService) => {
        return new GetAllOrdersAfterDateService(OrderRepository, OrderDateStringToDateConverter);
      },
      inject: ['OrderRepositoryInterface', 'OrderDateStringToDateConverter'],
    },

    {
      provide: GetAllOrdersByCustomerService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersByCustomerService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    // 2nd Part
    {
      provide: PayOrderService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new PayOrderService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: CancelOrderService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: DeleteOrderService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new DeleteOrderService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: CreateOrderService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
  ],
})
export default class OrderModule {}
