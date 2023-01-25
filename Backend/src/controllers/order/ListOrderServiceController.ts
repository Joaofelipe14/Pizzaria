import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
    async handle (req: Request, res:Response ){
        const listOrdeServie = new ListOrderService();

        const orders = await listOrdeServie.execute();

        return res.json(orders);

    }
}

export {ListOrderController}