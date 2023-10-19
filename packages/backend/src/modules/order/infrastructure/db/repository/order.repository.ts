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
  async findAllOrdersBeforeDate(date: String): Promise<Order[]> {
    //--------- CONVERT DATE
    const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = date.match(datePattern);
    // Extrait les parties de la date de la correspondance
    var day = parseInt(match[1], 10);
    var month = parseInt(match[2], 10) - 1;
    var year = parseInt(match[3], 10);
    var formattedDate = new Date(year, month, day);
    // Vérifie si la date est valide en comparant les composantes de la date
    var isValid = formattedDate.getDate() === day && formattedDate.getMonth() === month && formattedDate.getFullYear() === year;
    if (!isValid) {
      throw new Exception(ExceptionTypeEnum.WrongDateFormat, 'The date format is not valid');
    }

    //--------- QUERY REQUEST
    const query = this.createQueryBuilder('order');
    query.where('order.createdAt < :date', { date: formattedDate });
    const ordersOrm = await query.getMany();
    return this.mapOrdersOrmToOrders(ordersOrm);
  }

  // - Récupérer toutes les commandes APRES une date
  async findAllOrdersAfterDate(date: String): Promise<Order[]> {
    //--------- CONVERT DATE
    const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = date.match(datePattern);
    // Extrait les parties de la date de la correspondance
    var day = parseInt(match[1], 10);
    var month = parseInt(match[2], 10) - 1;
    var year = parseInt(match[3], 10);
    var formattedDate = new Date(year, month, day);
    // Vérifie si la date est valide en comparant les composantes de la date
    var isValid = formattedDate.getDate() === day && formattedDate.getMonth() === month && formattedDate.getFullYear() === year;
    if (!isValid) {
      throw new Exception(ExceptionTypeEnum.WrongDateFormat, 'The date format is not valid');
    }

    //--------- QUERY REQUEST
    const query = this.createQueryBuilder('order');
    query.where('order.createdAt > :date', { date: formattedDate });
    const ordersOrm = await query.getMany();
    return this.mapOrdersOrmToOrders(ordersOrm);
  }

  // - Récupérer toutes les commandes pour un CUSTOMER
  async findAllOrdersByCustomer(customer: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    query.where('order.customer = :customer', { customer });

    const ordersOrm = await query.getMany();

    if (ordersOrm.length === 0) {
      return null;
    }

    return this.mapOrdersOrmToOrders(ordersOrm);
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
