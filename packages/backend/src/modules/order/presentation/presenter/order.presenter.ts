import Order from "../../domain/model/entity/order.orm-entity";

export class OrderPresenter {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    customer: string;
    products: string[];

    constructor(order: Order){
        this.id = order.id;
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
        this.status = order.status;
        this.customer = order.customer;
        this.products = order.products;
    }
}