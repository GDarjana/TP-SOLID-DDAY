import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import OrderDateStringToDateConverterService from '../utils/order-date-string-to-date-converter.service';

export class GetAllOrdersAfterDateService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly orderDateStringToDateConverter: OrderDateStringToDateConverterService,
  ) {}

  async findAllOrdersAfterDate(date: string): Promise<Order[]> {
    const formattedDate = await this.orderDateStringToDateConverter.dateStringConvertToDate(date);
    const orders = await this.orderRepository.findAllOrdersAfterDate(formattedDate);
    return orders;
  }
}
