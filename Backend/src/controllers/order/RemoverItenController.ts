import { Request,Response } from "express";
import {RemoveItemService} from '../../services/order/RemoverItemSerivce'

class RemoverItenController {
    async handle(req: Request, res: Response ){
        const item_id = req.query.item_id as string;

        const removeItem = await new RemoveItemService();

        const order = removeItem.execute({
            item_id
        });

        return res.json(order);

    }
}


export { RemoverItenController }