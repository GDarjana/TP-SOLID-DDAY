import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { GetAllOrdersByCustomerService } from './get-all-orders-by-customer.service';

describe('Get All Orders For A Given Customer', () => {
  let orderRepositoryMock: OrderRepositoryInterface;

  beforeAll(() => {
    orderRepositoryMock = {
      searchOrdersByCustomer: () => [],
    } as unknown as OrderRepositoryInterface;
  });

  const ordersByCustomerMock = [
    {
      customer: 'alain',
      products: ['Shampoo', 'Chcolato'],
    },
    {
      customer: 'bernard',
      products: ['Shampoo', 'Chcolato'],
    },
  ];

  it('Should return orders if the customer name is valid', async () => {
    const orderRepositoryMockImpl = {
      ...orderRepositoryMock,
      findAllOrdersByCustomer: () => ordersByCustomerMock,
    } as unknown as OrderRepositoryInterface;

    const orderRepositoryByCustomerService = new GetAllOrdersByCustomerService(orderRepositoryMockImpl);

    const returnValue = await orderRepositoryByCustomerService.findAllOrdersByCustomer('domIsFamily');
    expect(returnValue).toEqual(ordersByCustomerMock);
  });

  it('Should return an error if the customer name is invalid', async () => {
    const orderRepositoryMockImpl = {
      ...orderRepositoryMock,
      findAllOrdersByCustomer: () => ordersByCustomerMock,
    } as unknown as OrderRepositoryInterface;

    const orderRepositoryByCustomerService = new GetAllOrdersByCustomerService(orderRepositoryMockImpl);
    await expect(orderRepositoryByCustomerService.findAllOrdersByCustomer('DomIsFamily4Ever')).rejects.toThrow();
  });
});
