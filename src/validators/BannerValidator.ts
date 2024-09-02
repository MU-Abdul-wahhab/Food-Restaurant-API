import { body, query } from "express-validator";


export class BannerValidators {

    static addBanner() {
        return [
            body('banner', 'Banner Image is required')
                .custom((banner, { req }) => {
                    if (req.file) {
                        return true;
                    } else {
                        throw ('File Not Uploaded');
                    }

                }),
        ];
    }

    static getBannerByStatus() {
        return [
            query('status', 'Status is required')
            .isBoolean()
               
        ];
    }

}