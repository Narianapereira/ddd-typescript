import Order from "./order";
import OrderItem from "./order_item";
import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "Product1", 100);
        }).toThrow("Id is required!")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let product = new Product("123", "", 100);
        }).toThrow("Name is required!")
    })

    it("should throw error when price is smaller than zero", () => {
        expect(() => {
            let product = new Product("123", "Product1", 0);
        }).toThrow("Price must be greater than zero")
    })

    it("should change name", () => {
        const product = new Product("123", "Product1", 100)
        product.changeName("Product2");
        expect(product.name).toBe("Product2")
    })

    it("should change price", () => {
        const product = new Product("123", "Product1", 100)
        product.changePrice(200);
        expect(product.price).toBe(200)
    })

});


