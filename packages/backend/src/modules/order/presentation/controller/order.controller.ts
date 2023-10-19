import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import Order from '../../domain/model/entity/order.orm-entity';
import { GetAllOrderService } from '../../domain/service/use-case/get-all-order.service';
import { OrderPresenter } from '../presenter/order.presenter';
import { GetAllOrderBeforeDateService } from '../../domain/service/use-case/get-all-order-before-date.service';
import { GetAllOrderAfterDateService } from '../../domain/service/use-case/get-all-order-after-date.service';
import { GetAllOrderByCustomerService } from '../../domain/service/use-case/get-all-order-by-customer.service';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly getAllOrderService: GetAllOrderService,
    private readonly getAllOrdersBeforeDate: GetAllOrderBeforeDateService,
    private readonly getAllOrdersAfterDate: GetAllOrderAfterDateService,
    private readonly getAllOrdersByCustomer: GetAllOrderByCustomerService,
  ) {}

  // Récupérer toutes les commandes
  @Get()
  async findAllOrders(): Promise<OrderPresenter[]> {
    const orders = await this.getAllOrderService.findAllOrders();

    return orders.map((orders) => {
      return new OrderPresenter(orders);
    });
  }

  // Récupérer les commandes passées AVANT une certaine date
  @Get('/by-date-before/:date')
  async findAllOrdersBeforeDate(@Param('date') date: string): Promise<OrderPresenter[]> {
    const ordersBeforeDate = await this.getAllOrdersBeforeDate.findAllOrdersBeforeDate(date);

    return ordersBeforeDate.map((ordersBeforeDate) => {
      return new OrderPresenter(ordersBeforeDate);
    });
  }

  // Récupérer les commandes passées APRES une certaine date
  @Get('/by-date-after/:date')
  async findAllOrdersAfterDate(@Param('date') date: string): Promise<OrderPresenter[]> {
    const ordersAfterDate = await this.getAllOrdersAfterDate.findAllOrdersAfterDate(date);

    return ordersAfterDate.map((ordersAfterDate) => {
      return new OrderPresenter(ordersAfterDate);
    });
  }

  // Récupérer les commandes passées par un CUSTOMER
  @Get('/by-customer/:customer')
  async findAllOrdersByCustomer(@Param('customer') customer: string): Promise<OrderPresenter[]> {
    const ordersByCustomer = await this.getAllOrdersByCustomer.findAllOrdersByCustomer(customer);

    return ordersByCustomer.map((ordersByCustomer) => {
      return new OrderPresenter(ordersByCustomer);
    });
  }
}
