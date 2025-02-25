import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place and order", () => {

        const customer = new Customer("c1", "Customer1")

        const item1 = new OrderItem("i1", "Item1", 10, "p1", 1)
        const order = OrderService.placeOrder(customer, [item1]) 
        
        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    })

    it("should get total of all orders", () => {

        const item1 = new OrderItem("i1", "Item1", 100, "p1", 2)
        const item2 = new OrderItem("i2", "Item2", 200, "p2", 2)
        
        const order1 = new Order("o1", "Cliente1", [item1])
        const order2 = new Order("o2", "Cliente1", [item2])

        const total = OrderService.total([order1, order2])

        expect(total).toBe(600)

    })
});