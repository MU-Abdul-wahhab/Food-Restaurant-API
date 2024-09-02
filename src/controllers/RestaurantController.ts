
import Category from "../models/Category";
import Restaurant from "../models/Restaurant";
import User from "../models/User";
import { Utils } from "../utils/Utils";

export class RestaurantController {

    static async addRestaurants(req, res, next) {
        const restaurant = req.body;

        const path = req.file.path;
        const verification_token = Utils.generateVerificationToken();


        try {
            const hash = await Utils.encryptPassword(req.body.password);

            const data = {
                email: restaurant.email,
                verification_token,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
                phone: restaurant.phone,
                password: hash,
                name: restaurant.name,
                type: 'restaurant',
                status: 'active',
            };


            const user = await new User(data).save();

            let restaurant_data: any = {
                name: restaurant.res_name,
                location: JSON.parse(restaurant.location),
                address: restaurant.address,
                openTime: restaurant.open_time,
                closeTime: restaurant.close_time,
                status: restaurant.status,
                cuisines: JSON.parse(restaurant.cuisines),
                price: parseInt(restaurant.price),
                delivery_time: parseInt(restaurant.delivery_time),
                city_id: restaurant.city_id,
                user_id: user._id,
                cover: path
            };

            if (restaurant.description) {
                restaurant_data = { ...restaurant_data, description: restaurant.description }
            }

            const restaurantDoc = await new Restaurant(restaurant_data).save();

            const categoriesData = JSON.parse(restaurant.categories).map(x => {
                return {
                    name: x, restaurant_id: restaurantDoc._id
                }
            });

            const categories = Category.insertMany(categoriesData);

            res.send(restaurantDoc);

        } catch (e) {
            next(e);
        }
    }

    static async getNearByRestaurants(req, res, next) {

        const data = req.query
        const EARTH_RADIUS_IN_KM = 6378.1;
        // console.log(data.lat);
        // console.log(data.lng);
        // console.log(data.radius);
        // const METERS_PER_KM = 1000;
        // const EARTH_RADIUS_IN_MILES = 3963.2;
        const perPage = 5;
        const currentPage = parseInt(data.page) || 1;
        const prvPage = currentPage == 1 ? null : currentPage - 1;
        let nextPage = currentPage + 1;

        try {

            const resCount = await Restaurant.countDocuments({
                status: 'Active',
                // location: {
                //     $nearSphere:
                //     {
                //         $geometry: { type: "Point", coordinates: [parseFloat(data.lng), parseFloat(data.lat)] },
                //         $maxDistance: data.radius * METERS_PER_KM
                //     }
                // }

                location: {
                    $geoWithin: {
                        $centerSphere: [
                            [parseFloat(data.lng), parseFloat(data.lat)],
                            parseFloat(data.radius) / EARTH_RADIUS_IN_KM
                        ]
                    }
                }
            })
            const totalPages = Math.ceil(resCount / perPage);

            if (totalPages == 0 || totalPages == currentPage) {
                nextPage = null;
            }

            if (totalPages < currentPage) {
                throw ('No more Restaurant available');
            }

            const restaurants = await Restaurant.find({
                status: 'Active',
                // location: {
                //     $nearSphere:
                //     {
                //         $geometry: { type: "Point", coordinates: [parseFloat(data.lng), parseFloat(data.lat)] },
                //         $maxDistance: data.radius * METERS_PER_KM
                //     }
                // }

                location: {
                    $geoWithin: {
                        $centerSphere: [
                            [parseFloat(data.lng), parseFloat(data.lat)],
                            parseFloat(data.radius) / EARTH_RADIUS_IN_KM
                        ]
                    }
                }
            }).skip((currentPage * perPage) - perPage).limit(perPage);

            res.json({
                restaurants,
                perPage,
                currentPage,
                prvPage,
                nextPage,
                totalPages
    
            });
        } catch (e) {
            next(e);
        }
    }

    static async searchNearByRestaurants(req, res, next) {

        const data = req.query
        const EARTH_RADIUS_IN_KM = 6378.1;
        const perPage = 5;
        const currentPage = parseInt(data.page) || 1;
        const prvPage = currentPage == 1 ? null : currentPage - 1;
        let nextPage = currentPage + 1;
        // const METERS_PER_KM = 1000;
        // const EARTH_RADIUS_IN_MILES = 3963.2;

        try {
            const resCount = await Restaurant.countDocuments({
                status: 'Active',
                name: { $regex: data.name, $options: 'i' },
                // location: {
                //     $nearSphere:
                //     {
                //         $geometry: { type: "Point", coordinates: [parseFloat(data.lng), parseFloat(data.lat)] },
                //         $maxDistance: data.radius * METERS_PER_KM
                //     }
                // }

                location: {
                    $geoWithin: {
                        $centerSphere: [
                            [parseFloat(data.lng), parseFloat(data.lat)],
                            parseFloat(data.radius) / EARTH_RADIUS_IN_KM
                        ]
                    }
                }
            })
            const totalPages = Math.ceil(resCount / perPage);

            if (totalPages == 0 || totalPages == currentPage) {
                nextPage = null;
            }

            if (totalPages < currentPage) {
                throw ('No more Restaurant available');
            }
            const restaurants = await Restaurant.find({
                status: 'Active',
                name: { $regex: data.name, $options: 'i' },
                // location: {
                //     $nearSphere:
                //     {
                //         $geometry: { type: "Point", coordinates: [parseFloat(data.lng), parseFloat(data.lat)] },
                //         $maxDistance: data.radius * METERS_PER_KM
                //     }
                // }

                location: {
                    $geoWithin: {
                        $centerSphere: [
                            [parseFloat(data.lng), parseFloat(data.lat)],
                            parseFloat(data.radius) / EARTH_RADIUS_IN_KM
                        ]
                    }
                }
            }).skip((currentPage * perPage) - perPage).limit(perPage);

            res.json({
                restaurants,
                perPage,
                currentPage,
                prvPage,
                nextPage,
                totalPages
    
            });
        } catch (e) {
            next(e);
        }
    }

    static async getByRestaurants(req, res, next) {
        try {
            const restaurants = await Restaurant.find({

                status: 'Active',

            });

            res.send(
                restaurants
            );
        } catch (e) {
            next(e);
        }
    }
}