import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';
import Order from '../../model/entity/order.orm-entity';

export interface OrderRepositoryInterface extends RepositoryInterface {
  findAllOrders(): Promise<Order[]>;
  findAllOrdersBeforeDate(date: string): Promise<Order[]>;
  findAllOrdersAfterDate(date: string): Promise<Order[]>;
  findAllOrdersByCustomer(date: string): Promise<Order[]>;
}
