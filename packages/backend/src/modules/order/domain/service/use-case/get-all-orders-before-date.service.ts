import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import OrderDateStringToDateConverterService from '../utils/order-date-string-to-date-converter.service';

export class GetAllOrdersBeforeDateService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly orderDateStringToDateConverter: OrderDateStringToDateConverterService,
  ) {}

  async findAllOrdersBeforeDate(date: string): Promise<Order[]> {
    const formattedDate = await this.orderDateStringToDateConverter.dateStringConvertToDate(date);
    const orders = await this.orderRepository.findAllOrdersBeforeDate(formattedDate);
    return orders;
  }
}
