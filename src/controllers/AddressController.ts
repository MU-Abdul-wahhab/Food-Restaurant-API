import Address from "../models/Address";

export class AddressController {

    static async addAddress(req, res, next) {
        const data = req.body;
        const user_id = req.user.aud;

        try {
            const address_data = {
                user_id,
                title: data.title,
                address: data.address,
                landmark: data.landmark,
                house: data.house,
                lat: data.lat,
                lng: data.lng
            }
            const address = await new Address(address_data).save();
            delete address.user_id;
            res.send(address);

        } catch (e) {
            next(e);
        }
    }

    static async getAddress(req, res, next) {
        const user_id = req.user.aud;
        const perPage = 5;
        const currentPage = parseInt(req.query.page) || 1;
        const prvPage = currentPage == 1 ? null :  currentPage - 1; 
        let nextPage = currentPage + 1;
        try {
            const  addressCount = await Address.countDocuments({user_id : user_id})
            const totalPages = Math.ceil(addressCount / perPage);

            if(totalPages == 0 || totalPages == currentPage){
                nextPage = null;
            }

            if(totalPages < currentPage){
                throw('No more addreses available');
            }

          
            const addresses = await Address.find({
                user_id
            }, { user_id: 0, _v: 0 }).skip((currentPage * perPage) - perPage).limit(perPage);
            // res.send(addresses);
            res.json({
                addresses,
                perPage,
                currentPage,
                prvPage,
                nextPage,
                totalPages

            })
        } catch (e) {
            next(e);
        }

    }

    static async getLimitedAddress(req, res, next) {
        const user_id = req.user.aud;
        const limit = req.query.limit;

        try {
            const addresses = await Address.find({
                user_id
            }, { user_id: 0, _v: 0 }).limit(limit);
            res.send(addresses);
        } catch (e) {
            next(e);
        }

    }

    static async deleteAddress(req, res, next) {
        const user_id = req.user.aud;
        const id = req.params.id
        try {
            await Address.findOneAndDelete({
                user_id,
                _id: id
            });
            res.json({
                success: true
            });
        } catch (e) {
            next(e);
        }
    }

    static async getAddressById(req, res, next) {
        const user_id = req.user.aud;
        const id = req.params.id

        try {
            const address = await Address.findOne(
                {
                    user_id,
                    _id: id
                },
                {
                    user_id: 0, __v: 0
                });
            res.send(address);
        } catch (e) {
            next(e);
        }
    }

    static async editAddress(req, res, next) {
        const user_id = req.user.aud;
        const id = req.params.id
        const data = req.body;

        try {
            const address = await Address.findOneAndUpdate({
                user_id,
                _id: id
            },
                {
                    title: data.title,
                    address: data.address,
                    landmark: data.landmark,
                    house: data.house,
                    lat: data.lat,
                    lng: data.lng,
                    updated_at: new Date()
                },
                {
                    new: true, projection: { user_id: 0, __v: 0 }
                });
            if (address) {
                res.send(address);
            } else {
                throw ("Address Does Not Exist");
            }

        } catch (e) {
            next(e);
        }
    }

    static async checkAddress(req, res, next) {
        const user_id = req.user.aud;
        const data = req.query;
        try {
            const address = await Address.find({
                user_id,
                lat: data.lat,
                lng: data.lng
            },
                { user_id: 0, _v: 0 });
            res.send(address);
        } catch (e) {
            next(e);
        }

    }

}