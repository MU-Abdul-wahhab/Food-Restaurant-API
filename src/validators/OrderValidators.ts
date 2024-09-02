import { body } from "express-validator";
import Restaurant from "../models/Restaurant";


export class OrderValidators {

    static placeOrder() {
        return [
            body('restaurant_id', 'Restaurant Id is required').isString()
            .custom((restaurant_id, { req }) => {
                return Restaurant.findById(restaurant_id).then(restaurant => {
                    if (restaurant) {
                        req.restaurant = restaurant;
                        return true;
                    } else {
                        throw ('Restaurant Doenst Exist');
                    }
                })
            }),
            body('order', 'order Items is required').isString(),
            body('address', 'Address is required').isString(),
            body('total', 'Order Total is required').isNumeric(),
            body('grandTotal', 'Grand Total is required').isNumeric(),
            body('deliveryCharge', 'Delivery Charge is required').isNumeric(),
            body('status', 'Order Status is required').isString(),
            body('payment_status', 'Payment Status is required').isBoolean(),
            body('payment_mode', 'Payment mode is required').isString(),


        ];
    }

  


}