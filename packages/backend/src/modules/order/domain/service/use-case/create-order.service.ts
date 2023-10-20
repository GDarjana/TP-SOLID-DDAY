import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { OrderStatusEnum } from '../../model/const/order-status.enum';
import Order from '../../model/entity/order.orm-entity';
import { CreateOrderDtoInterface } from '../../model/dto/create-order.dto.interface';

export class CreateOrderService {
  constructor(private readonly createOrderRepository: OrderRepositoryInterface) {}

  async createOrder(createOrderDto: CreateOrderDtoInterface): Promise<Order> {
    const orderWithCreator = {
      ...createOrderDto,
      status: OrderStatusEnum.InCart,
    };

    return await this.saveOrder(orderWithCreator);
  }

  private async saveOrder(orderWithCreator: DeepPartial<Order>): Promise<Order> {
    try {
      const order = await this.createOrderRepository.persist<Order>(orderWithCreator);

      return order;
    } catch (error) {
      throw new Exception(ExceptionTypeEnum.InternalServerError, `Cannot persist order : ${error.message}`);
    }
  }
}
