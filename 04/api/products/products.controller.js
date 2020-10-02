class ProductController {


    getProducts(req, res, next) {
        try {
            return res.send('getProducts');
        } catch (err) {
            next(err);
        }
    }

    createProduct(req, res, next) {
        try {
            return res.send('createProduct');
        } catch (err) {
            next(err);
        }
    }

    updateProduct(req, res, next) {
        try {
            return res.send('getupdateProductProducts');
        } catch (err) {
            next(err);
        }
    }

    updateTitleProduct(req, res, next) {
        try {
            return res.send('updateTitleProduct');
        } catch (err) {
            next(err);
        }
    }

    deleteProduct(req, res, next) {
        try {
            return res.send('deleteProduct');
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new ProductController();