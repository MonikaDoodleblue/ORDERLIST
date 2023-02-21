const apiRoutes = (app) => {
    app.use('/api', require('../src/orders/order'));
    app.use('/api', require('../src/products/product'));
    app.use('/api', require('../src/users/user'));
}

module.exports = {
    apiRoutes
}
