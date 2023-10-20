export enum ExceptionTypeEnum {
  BadRequest = 'BadRequest',
  NotFound = 'NotFound',
  InternalServerError = 'InternalServerError',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  // Date format is not supported
  WrongDateFormat = 'WrongDateFormat',
  // Customer name is not valid
  WrongCustomerName = 'WrongCustomerName',
}
