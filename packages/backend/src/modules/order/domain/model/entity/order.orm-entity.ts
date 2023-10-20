import { OrderStatusEnum } from '@src/modules/order/domain/model/const/order-status.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('order')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'status', default: OrderStatusEnum.InCart })
  status: string;

  @Column({ name: 'customer' })
  customer: string;

  @Column({ name: 'products', type: 'json', nullable: true })
  products: string[];

  pay(): void {
    this.status = OrderStatusEnum.Paid;
    this.updatedAt = new Date();
  }

  cancel(): void {
    this.status = OrderStatusEnum.Canceled;
    this.updatedAt = new Date();
  }
}
