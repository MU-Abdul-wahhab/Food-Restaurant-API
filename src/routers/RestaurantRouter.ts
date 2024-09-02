import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { RestaurantController } from "../controllers/RestaurantController";
import { RestaurantValidators } from "../validators/RestaurantValidators";
import { Utils } from "../utils/Utils";


class CityRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get('/getRestaurants', GlobalMiddleware.auth , RestaurantController.getByRestaurants);
    this.router.get('/nearByrestaurants', GlobalMiddleware.auth , RestaurantValidators.getNearByRestaurants() , GlobalMiddleware.checkError , RestaurantController.getNearByRestaurants);
    this.router.get('/searchNearByrestaurants', GlobalMiddleware.auth , RestaurantValidators.searchNearByRestaurants() , GlobalMiddleware.checkError , RestaurantController.searchNearByRestaurants);
    // this.router.get('/status', GlobalMiddleware.auth , GlobalMiddleware.adminRole, BannerValidators.getBannerByStatus(), GlobalMiddleware.checkError , BannerController.getBannersByStatus);
  }

  postRoutes() {
   this.router.post('/create' , GlobalMiddleware.auth , GlobalMiddleware.adminRole , new Utils().multer.single('cover'), RestaurantValidators.addRestaurant() , GlobalMiddleware.checkError , RestaurantController.addRestaurants);
  }

  patchRoutes() {
    
  }

  putRoutes() { }

  deleteRoutes() { }

}

export default new CityRouter().router;