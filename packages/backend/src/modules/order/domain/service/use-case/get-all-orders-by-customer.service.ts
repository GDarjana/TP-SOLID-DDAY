import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export class GetAllOrdersByCustomerService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async findAllOrdersByCustomer(customer: string): Promise<Order[]> {
    const regex = /^[a-zA-Z ]+$/;
    if (customer.length < 6 || !regex.test(customer)) {
      throw new Exception(ExceptionTypeEnum.BadRequest, `The customer name ${customer} is not valid`);
    }
    const orders = await this.orderRepository.findAllOrdersByCustomer(customer);
    return orders;
  }
}
