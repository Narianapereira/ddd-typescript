import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrow("Id is required!")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrow("Name is required!")
    })

    it("should change name", () => {
        let customer = new Customer("1", "John");
            customer.changeName("Jane")
        expect(customer.name).toBe("Jane")
    })

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer1");
        const address = new Address("Street 1", 123, "00000000", "São Paulo");
        customer.Address = address;

        customer.activate();
        expect(customer.isActive()).toBe(true);
    })

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer1");

        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    })

    it("should throw error when address is undefined when activating a customer", () => {
        const customer = new Customer("1", "Customer1");
        expect(() => {
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer")
    })

});


