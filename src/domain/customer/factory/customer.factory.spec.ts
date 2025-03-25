import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("should create a customer", () => {
        let customer = CustomerFactory.create("John")
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John")
        expect(customer.Address).toBeUndefined();
    })

    it("should create a customer with an address", () => {
        let address = new Address("Rua das Bromélias", 123, "89218411", "Jaraguá");
        let customer = CustomerFactory.createWithAddress("John", address)
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John")
        expect(customer.Address).toBe(address);
    })
}

)