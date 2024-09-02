import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { BannerValidators } from "../validators/BannerValidator";
import { BannerController } from "../controllers/BannerController";
import { Utils } from "../utils/Utils";

class BannerRouter {
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
    this.router.get('/banners', GlobalMiddleware.auth , GlobalMiddleware.adminRole, BannerController.getBanners);
    this.router.get('/status', GlobalMiddleware.auth , GlobalMiddleware.adminRole, BannerValidators.getBannerByStatus(), GlobalMiddleware.checkError , BannerController.getBannersByStatus);
  }

  postRoutes() {
   this.router.post('/create' , GlobalMiddleware.auth , GlobalMiddleware.adminRole, new Utils().multer.single('banner') , BannerValidators.addBanner() , GlobalMiddleware.checkError , BannerController.addBanner);
  }

  patchRoutes() {
    
  }

  putRoutes() { }

  deleteRoutes() { }

}

export default new BannerRouter().router;