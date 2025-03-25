import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderFactoryProps{
    id: string,
    customerId: string,
    itens:{
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number;
    }[]
}

export default class OrderFactory {

   
    public static create(orderProps: OrderFactoryProps): Order {
        const itens = orderProps.itens.map((item) => {
            return new OrderItem(item.id, 
                item.name, 
                item.price,
                item.productId, 
                item.quantity
            );
        });

        return new Order(orderProps.id, orderProps.customerId, itens)
    }
}
