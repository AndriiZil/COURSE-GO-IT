const { Router } = require('express');

const ProductController = require('./products.controller');

const productRouter = Router();

productRouter.get('/', ProductController.getProducts);

productRouter.post('/add', ProductController.createProduct);

productRouter.put('/', ProductController.updateProduct);

productRouter.patch('/', ProductController.updateTitleProduct);

productRouter.delete('/', ProductController.deleteProduct);

module.exports = productRouter;