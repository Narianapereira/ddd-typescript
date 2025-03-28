import { Op } from "sequelize";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";


export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
          await OrderModel.update(
              {
                  customer_id: entity.customerId,
                  total: entity.total(),
              },
              {
                  where: {
                      id: entity.id
                  },
              }
          );
          await OrderItemModel.destroy({
            where: {
                order_id: entity.id
            }
        });

        await Promise.all(
          entity.items.map(async (item) => {
            await OrderItemModel.create({
              id: item.id,
              order_id: entity.id, 
              name: item.name,
              price: item.price,
              product_id: item.productId,
              quantity: item.quantity,
            });
          })
        );
      }

      async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
          where: { id },
          include: [{ model: OrderItemModel, as: "items" }], 
        });
      
        const orderItems = orderModel.items.map(
          (item) =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.product_id,
              item.quantity
            )
        );
      
        return new Order(orderModel.id, orderModel.customer_id, orderItems);
      }

      async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
          include: [{ model: OrderItemModel, as: "items" }],
        });
      
        return orderModels.map((orderModel) => {
          const orderItems = orderModel.items.map(
            (item) =>
              new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
          );
      
          return new Order(orderModel.id, orderModel.customer_id, orderItems);
        });
      }
    }