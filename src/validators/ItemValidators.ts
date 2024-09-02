import { body, query, param } from "express-validator";
import Restaurant from "../models/Restaurant";
import Category from "../models/Category";


export class ItemValidators {

    static addItem() {
        return [
            body('itemImage', 'Item Image Is Required').custom((cover, { req }) => {
                if (req.file) {
                    return true;
                } else {
                    throw ('File Is Not Uploaded');
                }
            }),
            body('name', 'Item Name Is Required').isString(),
            body('restaurant_id', 'Restaurant Id Is Required').isString()
                .custom((restaurant_id, { req }) => {
                    return Restaurant.findById(restaurant_id).then(restaurant => {
                        if (restaurant) {
                            return true;
                        } else {
                            throw ('Restaurant Doenst Exist');
                        }
                    })
                }),
            body('category_id', 'Category Id Is Required').isString()
                .custom((category_id, { req }) => {
                    return Category.findOne({ _id: category_id, restaurant_id: req.body.restaurant_id }).then(category => {
                        if (category) {
                            return true;
                        } else {
                            throw ('category Does Not Exist');
                        }
                    })
                }),
            body('price', 'Price Is Required').isString(),
            body('veg', 'Item is Veg or Not is Required').isBoolean(),
            body('status', 'Status Is Required').isBoolean(),

        ];
    }

    static getMenuItems() {
        return [
            param('restaurantId', 'Restaurant Id Is Required').isString()
                .custom((restaurant_id, { req }) => {
                    return Restaurant.findById(restaurant_id).then(restaurant => {
                        if (restaurant) {
                            req.restaurant = restaurant;
                            return true;
                        } else {
                            throw ('Restaurant Doenst Exist');
                        }
                    }).catch(e=>{
                        throw new Error(e);
                    })
                }),
        ];
    }


}