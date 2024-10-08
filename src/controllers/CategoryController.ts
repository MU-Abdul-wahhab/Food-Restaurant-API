import Category from "../models/Category";


export class CategoryController {

    static async getCategoriesByRestaurant(req , res , next){

        const restaurant_id = req.params.restaurantId;
     
        try{
            const categories = await Category.find({
                restaurant_id : restaurant_id
            },
        {
            __v : 0
        }).populate('restaurant_id');

            res.send(categories);
        }catch(e){
            next(e);
        }

    }

}