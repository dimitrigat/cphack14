module.exports = function(app) {

    //products
    var products = [{name: 'Shirt', price: 12.99}, {name: 'Hose', price: 29.99}]

    SphereClient = require('sphere-node-client');

    var client = new SphereClient({config: {
        'client_id' : app.get('conf').get('sphereio').client_id,
        'client_secret' : app.get('conf').get('sphereio').client_secret,
        'project_key' : app.get('conf').get('sphereio').project_key
    }});

    // Home/main
    app.get('/', function(req, res) {
        client.products.all().fetch()
            .then(function(result) {
                var products = [];
                //console.log("Results: %d", result.body.total);
                for (var i = 0; i < result.body.results.length; i++) {
                    products.push(result.body.results[i]);
                    console.log("%j", result.body.results[i]);
                }

                res.render('index', { title: 'C+ Hackathlon shop', products: products })
            })
            .fail(function(error) {console.log(error.message)});
    })

    // product
    app.get('/product/:id', function(req, res) {
        client.products.where('id="' + req.params.id + '"').fetch()
            .then(function(result) {
                var product = result.body.results[0];

                res.render('product', { product: product })
            })
            .fail(function(error) {console.log(error.message)});
    })
}