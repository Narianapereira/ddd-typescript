import Order from './domain/checkout/entity/order';
import OrderItem from './domain/checkout/entity/order_item';
import Customer from './domain/customer/entity/customer';
import Address from './domain/customer/value-object/address';


let customer = new Customer("123", "Nariana Pereira");
const address = new Address("Estrada Piraí", 5805, "89239899", "Joinville")
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 100, "p1", 2);
const item2 = new OrderItem("2", "Item 2", 200, "p2", 2);
const order = new Order("1", "123", [item1, item2])