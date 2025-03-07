import CustomerCreatedEvent from "../customer/customer-created.event";
import SendConsoleWhenCustomerIsCreatedLog1Handler from "../customer/handler/send-console-log-when-customer-is-created-1-handler";
import SendConsoleWhenCustomerIsCreatedLog2Handler from "../customer/handler/send-console-log-when-customer-is-created-2-handler";
import SendConsoleLogWhenCustomerIsUpdated from "../customer/handler/send-console-log-when-customer-is-updated-handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("domain event tests", () => {

    it("should register event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    })

    it("should unregister event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    })

    it("should unregister all events", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    })

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();

        const productEventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyProductEventHandler = jest.spyOn(productEventHandler, "handle")

        const customerEventHandler1 = new SendConsoleWhenCustomerIsCreatedLog1Handler();
        const spyCustomerEventHandler1 = jest.spyOn(customerEventHandler1, "handle")

        const customerEventHandler2 = new SendConsoleWhenCustomerIsCreatedLog2Handler();
        const spyCustomerEventHandler2 = jest.spyOn(customerEventHandler2, "handle")

        const customerUpdateEventHandler = new SendConsoleLogWhenCustomerIsUpdated();
        const spyCustomerUpdateEventHandler = jest.spyOn(customerUpdateEventHandler, "handle")

        eventDispatcher.register("ProductCreatedEvent", productEventHandler);
        eventDispatcher.register("CustomerCreatedEvent", customerEventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", customerEventHandler2);
        eventDispatcher.register("CustomerCreatedEvent", customerUpdateEventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(productEventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toContain(customerEventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toContain(customerEventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toContain(customerUpdateEventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Prod 1 desc",
            price: 10.0,
        })

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "123",
            name: "Customer 1",
            address: "Teste de Endereço"
        })

        eventDispatcher.notify(productCreatedEvent);
        eventDispatcher.notify(customerCreatedEvent)
        expect(spyProductEventHandler).toHaveBeenCalled();
        expect(spyCustomerEventHandler1).toHaveBeenCalledWith(customerCreatedEvent);
        expect(spyCustomerEventHandler2).toHaveBeenCalledWith(customerCreatedEvent);
        expect(spyCustomerUpdateEventHandler).toHaveBeenCalledWith(customerCreatedEvent);

    })

});