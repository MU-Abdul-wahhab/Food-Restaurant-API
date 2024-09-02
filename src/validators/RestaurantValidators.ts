import { body, query } from "express-validator";
import User from "../models/User";


export class RestaurantValidators {

    static addRestaurant() {
        return [
            body('name', 'Owner Name is required').isString(),
            body('email', 'Email is required').isEmail().custom((email, { req }) => {
                return User.findOne({ email: email }).then(user => {
                    if (user) {
                        return Promise.reject("Restaurant Already Exist");
                    } else {
                        return true;
                    }
                }).catch(e => {
                    return Promise.reject(e);
                })
            }),
            body('phone', 'Phone Number is required').isString(),
            body('password', 'Password is required').isAlphanumeric().isLength({ min: 8, max: 25 })
                .withMessage("Password must be between 8-20 Characters"),
            body('cover', 'cover Image is required')
                .custom((cover, { req }) => {
                    if (req.file) {
                        return true;
                    } else {
                        throw ('Cover File Not Uploaded');
                    }
                }),
            body('res_name', 'Restaurant Name is required').isString(),
            body('short_name', 'Restaurant Short Name is required').isString(),
            body('open_time', 'Open Time is required').isString(),
            body('close_time', 'Close Time is required').isString(),
            body('price', 'Price is required').isString(),
            body('delivery_time', 'Delivery Time is required').isString(),
            body('status', 'Status is required').isString(),
            body('address', 'Address is required').isString(),
            body('location', 'Location is required').isString(),
            body('cuisines', 'Cuisines is required').isString(),
            body('city_id', 'City is required').isString(),
        ];
    }

    static getNearByRestaurants(){
        
        return [
            query('lat' , 'Lattitude Is Required').isNumeric(),
            query('lng' , 'Longtitude Is Required').isNumeric(),
            query('radius' , 'Radius Is Required').isNumeric(),
        ];
    }

    static searchNearByRestaurants(){
        
        return [
            query('name' , 'Search Query Is Required').isString(),
            query('lat' , 'Lattitude Is Required').isNumeric(),
            query('lng' , 'Longtitude Is Required').isNumeric(),
            query('radius' , 'Radius Is Required').isNumeric(),
        ];
    }


}