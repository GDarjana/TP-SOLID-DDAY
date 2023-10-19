import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';

export class GetAllOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async findAllOrders(): Promise<Order[]> {
    return await this.orderRepository.findAllOrders();
  }
}
