import { body, query } from "express-validator";


export class CityValidators {

    static addCity() {
        return [
            body('name', 'City Name is required').isString(),
            body('lat', 'Lat is required').isNumeric(),
            body('lng', 'Lng is required').isNumeric(),
            body('status', 'Status is required').isString(),
        ];
    }

    

}