const express = require('express');
const router = express.Router();
const controller = require('./productController');

router.get('/products', controller.getProduct); //get all product
router.get('/productid/:id', controller.getProductById); //get product by id
router.put('/update/:id', controller.updateProduct); //update the product
router.delete('/delete/:id', controller.deleteProduct); //delete the product
router.post('/upload', controller.uploadProducts); //save products in db (uploadFile)

module.exports = router;