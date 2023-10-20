import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';
import Order from '../../model/entity/order.orm-entity';

export interface OrderRepositoryInterface extends RepositoryInterface {
  findAllOrders(): Promise<Order[]>;
  findAllOrdersBeforeDate(date: Date): Promise<Order[]>;
  findAllOrdersAfterDate(date: Date): Promise<Order[]>;
  findAllOrdersByCustomer(customer: string): Promise<Order[]>;
  findOrderById(id: string): Promise<Order>;
}
