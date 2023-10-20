import { Brackets, DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { OrmEntityToDomainEntityMapper } from '@src/modules/shared/infrastructure/db/ormEntityToDomainEntityMapper.service';

import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface {
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,

    @Inject(OrmEntityToDomainEntityMapper)
    private readonly ormEntityToDomainEntityMapper: OrmEntityToDomainEntityMapper,
  ) {
    super(Order, datasource.createEntityManager());
  }

  // - Récupérer toutes les commandes
  async findAllOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    const orderOrm = await query.getMany();

    return this.mapOrdersOrmToOrders(orderOrm);
  }

  // - Récupérer toutes les commandes AVANT une date
  async findAllOrdersBeforeDate(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.createdAt < :date', { date: date });
    const ordersOrm = await query.getMany();
    return this.mapOrdersOrmToOrders(ordersOrm);
  }

  // - Récupérer toutes les commandes APRES une date
  async findAllOrdersAfterDate(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.createdAt > :date', { date: date });
    const ordersOrm = await query.getMany();
    return this.mapOrdersOrmToOrders(ordersOrm);
  }

  // - Récupérer toutes les commandes pour un CUSTOMER
  async findAllOrdersByCustomer(customer: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.customer = :customer', { customer });
    const ordersOrm = await query.getMany();
    return this.mapOrdersOrmToOrders(ordersOrm);
  }

  async findOrderById(id: string): Promise<Order> {
    const query = this.createQueryBuilder('Order');

    query.where('Order.id = :id', { id });

    const order = await query.getOne();

    return order;
  }

  async persist<Order>(entityToBePersisted: DeepPartial<Order>): Promise<Order> {
    const orderOrmToBePersisted = this.create(entityToBePersisted);
    const orderPersisted = await this.save(orderOrmToBePersisted);

    return (await this.findOrderById(orderPersisted.id)) as unknown as Order;
  }

  // MAPPER FUNCTIONS
  private mapOrderOrmToOrder(orderOrm: Order): Order {
    const order = this.ormEntityToDomainEntityMapper.mapOrmEntityToDomainEntity<Order>(orderOrm, new Order());

    return order;
  }

  private mapOrdersOrmToOrders(orderOrm: Order[]): Order[] {
    return orderOrm.map((orderOrm) => this.mapOrderOrmToOrder(orderOrm));
  }
}
