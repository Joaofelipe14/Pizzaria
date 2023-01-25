import prismaClient from "../../prisma";


interface DeatilRequest{
    order_id: string
}

class DetailOrderService{
    async execute({order_id}: DeatilRequest){
        const orders = await prismaClient.item.findMany({
            where:{
                order_id: order_id
            },
            include:{
                product: true,
                order:true,
            }
        })
        console.log(order_id);
        return orders;
        
    }
}


export { DetailOrderService }