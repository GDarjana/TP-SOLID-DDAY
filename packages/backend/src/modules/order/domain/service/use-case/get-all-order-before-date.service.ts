import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export class GetAllOrderBeforeDateService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async findAllOrdersBeforeDate(date: string): Promise<Order[]> {
    const orders = await this.orderRepository.findAllOrdersBeforeDate(date);
    if (orders.length === 0) {
      throw new Exception(ExceptionTypeEnum.NotFound, `Orders before ${date} not found`);
    }
    return orders;
  }
}
