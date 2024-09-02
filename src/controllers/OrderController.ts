import Address from "../models/Address";
import Order from "../models/Order";

export class OrderController {

    static async placeOrder(req, res, next) {
        const data = req.body;
        const user_id = req.user.aud;
        const restaurant = req.restaurant;

        try {

            let orderData: any = {
                user_id,
                restaurant_id: data.restaurant_id,
                order: data.order,
                address: data.address,
                status: data.status,
                payment_mode: data.payment_mode,
                payment_status: data.payment_status,
                total: data.total,
                grandTotal: data.grandTotal,
                deliveryCharge: data.deliveryCharge
            }

            if (data.instructions) orderData = { ...orderData, instructions: data.instructions }

            const order = await new Order(orderData).save();
            // delete order.user_id;
            // delete order.__v;

            const response_order = {
                restaurant_id: restaurant,
                address: order.address,
                order: JSON.parse(order.order),
                instructions: order.instructions || 'Instructions Not Defined',
                grandTotal: order.grandTotal,
                total: order.total,
                deliveryCharge: order.deliveryCharge,
                status: order.status,
                payment_status: order.payment_status,
                payment_mode: order.payment_mode,
                created_at: order.created_at,
                updated_at: order.updated_at,

            }

            res.send(response_order);

        } catch (e) {
            next(e);
        }
    }

    static async getUserOrders(req ,  res , next){
        const user_id = req.user.aud;
        const perPage = 5;
        const currentPage = parseInt(req.query.page) || 1;
        const prvPage = currentPage == 1 ? null :  currentPage - 1; 
        let nextPage = currentPage + 1;

      

        try{
            const  ordersCount = await Address.countDocuments({user_id : user_id})
            const totalPages = Math.ceil(ordersCount / perPage);
    
            if(totalPages == 0 || totalPages == currentPage){
                nextPage = null;
            }
    
            if(totalPages < currentPage){
                throw('No more Orders available');
            }

            const orders = await Order.find({
                user_id : user_id
            },
        {
            user_id : 0 , __v : 0
        }).skip((currentPage * perPage) - perPage).limit(perPage).sort({'created_at' : -1}).populate('restaurant_id').exec();

        res.json({
            orders,
            perPage,
            currentPage,
            prvPage,
            nextPage,
            totalPages

        });
        }catch(e){
            next(e);
        }
    }

}