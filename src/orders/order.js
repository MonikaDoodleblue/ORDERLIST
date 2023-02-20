const express = require('express');
const router = express.Router();
const controller = require('./orderController');

router.get('/orders', controller.getOrder); //get all orders
router.get('/orderid/:id', controller.getOrderById); //get order by id
router.get('/page', controller.getOrderByPage); //get order by page no (query)
router.get('/date/:order_date', controller.getOrderByDate); //get order by date (query)
router.post('/save', controller.saveOrder); //save the order
router.put('/update/:id', controller.updateOrder); //update the order
router.delete('/delete/:id', controller.deleteOrder); //delete the order

module.exports = router;