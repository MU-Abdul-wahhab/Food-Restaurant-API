import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { CityController } from "../controllers/CityController";
import { CityValidators } from "../validators/CityValidators";

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
    this.router.get('/cities',  CityController.getCities);
    // this.router.get('/status', GlobalMiddleware.auth , GlobalMiddleware.adminRole, BannerValidators.getBannerByStatus(), GlobalMiddleware.checkError , BannerController.getBannersByStatus);
  }

  postRoutes() {
   this.router.post('/create' , CityValidators.addCity() , GlobalMiddleware.checkError , CityController.addCities);
  }

  patchRoutes() {
    
  }

  putRoutes() { }

  deleteRoutes() { }

}

export default new CityRouter().router;