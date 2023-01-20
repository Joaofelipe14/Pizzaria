import { Request,Response } from "express";
import {RemoverOderService} from '../../services/order/RemoverOrderService'

class RemoverOrderController {
    async handle(req: Request, res: Response ){
        const order_id = req.query.order_id as string;

        const removeOrder = await new RemoverOderService();

        const order = removeOrder.execute({
            order_id
        });

        return res.json(order);

    }
}


export { RemoverOrderController }