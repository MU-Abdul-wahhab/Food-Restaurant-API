import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { AddressController } from "../controllers/AddressController";
import { AddressValidators } from "../validators/AddressValidators";


class AddressRouter {
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
   this.router.get('/addresses' , GlobalMiddleware.auth , AddressController.getAddress);
   this.router.get('/checkAddress' , GlobalMiddleware.auth , AddressValidators.checkAddress() , GlobalMiddleware.checkError ,  AddressController.checkAddress);
   this.router.get('/getLimitedAddress' , GlobalMiddleware.auth , AddressValidators.getLimitedAddress() , GlobalMiddleware.checkError ,  AddressController.getLimitedAddress);
//    this.router.use('/:id' , GlobalMiddleware.auth , AddressController.getAddressById);
  }

  postRoutes() {
    this.router.post('/create' , GlobalMiddleware.auth , AddressValidators.addAddress() , GlobalMiddleware.checkError, AddressController.addAddress);
  }

  patchRoutes() {
}

putRoutes() { 
    this.router.patch('/edit/:id' , GlobalMiddleware.auth , AddressValidators.editAddress() , GlobalMiddleware.checkError, AddressController.editAddress);
}

  deleteRoutes() {
    this.router.use('/delete/address/:id' , GlobalMiddleware.auth , AddressController.deleteAddress);
   }

}

export default new AddressRouter().router;