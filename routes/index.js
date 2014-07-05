module.exports = function(app) {

    //products
    var products = [{name: 'Shirt', price: 12.99}, {name: 'Hose', price: 29.99}]

    SphereClient = require('sphere-node-client');

    var client = new SphereClient({config: {
        'client_id' : 'JrwhqXpdIr1NJOBRIIfmW1dD',
        'client_secret' : 'Dygrpv-Az7vrWxKwzOZq26isKZpW1wBF',
        'project_key' : 'cphack'
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