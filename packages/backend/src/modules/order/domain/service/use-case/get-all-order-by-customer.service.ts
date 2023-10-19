import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export class GetAllOrderByCustomerService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async findAllOrdersByCustomer(customer: string): Promise<Order[]> {
    const orders = await this.orderRepository.findAllOrdersByCustomer(customer);
    if (orders.length === 0) {
      throw new Exception(ExceptionTypeEnum.NotFound, `Orders for ${customer} not found`);
    }
    return orders;
  }
}
