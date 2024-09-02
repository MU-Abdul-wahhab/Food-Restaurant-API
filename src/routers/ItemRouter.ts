import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { ItemController } from "../controllers/ItemController";
import {ItemValidators} from "../validators/ItemValidators" ; 
import { Utils } from "../utils/Utils";


class ItemRouter {
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
    this.router.get('/menuItems/:restaurantId', GlobalMiddleware.auth , ItemValidators.getMenuItems(),  ItemController.getMenu);
   
  }

  postRoutes() {
    this.router.post('/create' , GlobalMiddleware.auth , GlobalMiddleware.adminRole ,new Utils().multer.single('itemImage') ,ItemValidators.addItem(),  GlobalMiddleware.checkError , ItemController.addItems);
  }

  patchRoutes() {
    
  }

  putRoutes() { }

  deleteRoutes() { }

}

export default new ItemRouter().router;