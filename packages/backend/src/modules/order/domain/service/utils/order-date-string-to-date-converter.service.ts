import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export default class OrderDateStringToDateConverterService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  private async extractDate(date: string): Promise<Date> {
    const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = date.match(datePattern);

    if (match === null) {
      throw new Exception(ExceptionTypeEnum.WrongDateFormat, 'The date format is not valid');
    }

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

    return formattedDate;
  }

  async dateStringConvertToDate(date: string): Promise<Date> {
    return this.extractDate(date);
  }
}
