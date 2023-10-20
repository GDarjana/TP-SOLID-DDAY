import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { GetAllOrdersService } from '../../domain/service/use-case/get-all-orders.service';
import { OrderPresenter } from '../presenter/order.presenter';
import { GetAllOrdersBeforeDateService } from '../../domain/service/use-case/get-all-orders-before-date.service';
import { GetAllOrdersAfterDateService } from '../../domain/service/use-case/get-all-orders-after-date.service';
import { GetAllOrdersByCustomerService } from '../../domain/service/use-case/get-all-orders-by-customer.service';
import { PayOrderService } from '../../domain/service/use-case/pay-order.service';
import { CancelOrderService } from '../../domain/service/use-case/cancel-order.service';
import { DeleteOrderService } from '../../domain/service/use-case/delete-order.service';
import { CreateOrderDto } from '../../domain/model/create-order.dto';
import { CreateOrderService } from '../../domain/service/use-case/create-order.service';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly getAllOrdersService: GetAllOrdersService,
    private readonly getAllOrderssBeforeDate: GetAllOrdersBeforeDateService,
    private readonly getAllOrderssAfterDate: GetAllOrdersAfterDateService,
    private readonly getAllOrderssByCustomer: GetAllOrdersByCustomerService,
    // 2nd Part
    private readonly payOrderService: PayOrderService,
    private readonly cancelOrderService: CancelOrderService,
    private readonly deleteOrderService: DeleteOrderService,
    private readonly createOrderService: CreateOrderService,
  ) {}

  // Récupérer toutes les commandes
  @Get()
  async findAllOrders(): Promise<OrderPresenter[]> {
    const orders = await this.getAllOrdersService.findAllOrders();

    return orders.map((orders) => {
      return new OrderPresenter(orders);
    });
  }

  // Récupérer les commandes passées AVANT une certaine date
  @Get('/by-date-before/:date')
  async findAllOrdersBeforeDate(@Param('date') date: string): Promise<OrderPresenter[]> {
    const ordersBeforeDate = await this.getAllOrderssBeforeDate.findAllOrdersBeforeDate(date);

    return ordersBeforeDate.map((ordersBeforeDate) => {
      return new OrderPresenter(ordersBeforeDate);
    });
  }

  // Récupérer les commandes passées APRES une certaine date
  @Get('/by-date-after/:date')
  async findAllOrdersAfterDate(@Param('date') date: string): Promise<OrderPresenter[]> {
    const ordersAfterDate = await this.getAllOrderssAfterDate.findAllOrdersAfterDate(date);

    return ordersAfterDate.map((ordersAfterDate) => {
      return new OrderPresenter(ordersAfterDate);
    });
  }

  // Récupérer les commandes passées par un CUSTOMER
  @Get('/by-customer/:customer')
  async findAllOrdersByCustomer(@Param('customer') customer: string): Promise<OrderPresenter[]> {
    const ordersByCustomer = await this.getAllOrderssByCustomer.findAllOrdersByCustomer(customer);

    return ordersByCustomer.map((ordersByCustomer) => {
      return new OrderPresenter(ordersByCustomer);
    });
  }

  // Payer une commande
  @Patch('/:id/paid')
  async payOrder(@Param('id') id: string): Promise<OrderPresenter> {
    const order = await this.payOrderService.payOrder(id);
    return new OrderPresenter(order);
  }

  // Annulé une commande
  @Patch('/:id/cancel')
  async cancelOrder(@Param('id') id: string): Promise<OrderPresenter> {
    const order = await this.cancelOrderService.cancelOrder(id);

    return new OrderPresenter(order);
  }

  // Supprimer une commande
  @Delete('/:id')
  async deleteOrder(@Param('id') id: string): Promise<void> {
    return await this.deleteOrderService.deleteOrder(id);
  }

  // Créer une commande
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderPresenter> {
    const order = await this.createOrderService.createOrder(createOrderDto);

    return new OrderPresenter(order);
  }
}
