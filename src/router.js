const apiRoutes = (app) => {
    app.use('/api', require('../src/orders/order'));
    app.use('/api', require('../src/products/product'));
}

module.exports = {
    apiRoutes
}