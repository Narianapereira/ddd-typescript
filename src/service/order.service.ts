import Order from "../entity/order"

export default class OrderService {

    static total(orders: Order[]): number {
        return orders.reduce((accumulative, order) => accumulative + order.total(), 0);
        }
}