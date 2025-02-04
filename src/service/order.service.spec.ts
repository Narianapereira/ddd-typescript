import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should get total of all orders", () => {

        const item1 = new OrderItem("i1", "Item1", 100, "p1", 2)
        const item2 = new OrderItem("i2", "Item2", 200, "p2", 2)
        
        const order1 = new Order("o1", "Cliente1", [item1])
        const order2 = new Order("o2", "Cliente1", [item2])

        const total = OrderService.total([order1, order2])

        expect(total).toBe(600)

    })
});