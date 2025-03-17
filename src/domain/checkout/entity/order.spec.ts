import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("Id is required!")
    })

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrow("CustomerId is required!")
    })

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("1", "123", []);
        }).toThrow("Item qtd must be grater than zero")
    })

    it("should calculate total", () => {
        const item1 = new OrderItem("i1", "Item1", 100, "p1", 2)
        const item2 = new OrderItem("i2", "Item2", 200, "p2", 2)
        const order = new Order("1", "123", [item1, item2])
        const total = order.total();
        expect(total).toBe(600)
    })

    it("should throw when item qty is smaller than zero", () => {
               
        expect(() => {
            const item1 = new OrderItem("i1", "Item1", 100, "p1", 0)
            const order = new Order("1", "123", [item1])
        }).toThrow("Quantity must be greater than 0")
    })

});


