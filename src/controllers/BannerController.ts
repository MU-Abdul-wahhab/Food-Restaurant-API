import Banner from "../models/Banner";

export class BannerController {

    static async addBanner(req, res, next) {
        const path = req.file.path;

        try {
            let data : any = {
                banner: path
            };

            if(req.body.restaurant_id) {
                data = {...data,  restaurant_id : req.body.restaurant_id };
            }

            const banner = await new Banner(data).save();
            res.send(banner);

        } catch (e) {
            next(e);
        }
    }

    static async getBanners(req, res, next) {

        try {
            const banners = await Banner.find({status : true});
            res.send(banners);
        } catch (e) {
            next(e);
        }

    }

    static async getBannersByStatus(req, res, next) {
        const status = req.query.status;
      
        try {
            const banners = await Banner.find({
                status: status
            })
            if (banners.length === 0) {
                res.status(404).send({ message: 'No banners found with the specified status.' });
            } else {
                res.send(banners);
            }

        } catch (e) {
            next(e);
        }
    }

}