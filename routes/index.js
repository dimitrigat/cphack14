module.exports = function(app) {

    SphereClient = require('sphere-node-client');

    var client = new SphereClient({config: {
        'client_id' : app.get('conf').get('sphereio').client_id,
        'client_secret' : app.get('conf').get('sphereio').client_secret,
        'project_key' : app.get('conf').get('sphereio').project_key
    }});

    // Home/main
    app.get('/', function(req, res) {
        var products = [];
        var categories = [];

        client.products.all().fetch()
            .then(function(result) {

                for (var i = 0; i < result.body.results.length; i++) {
                    products.push(result.body.results[i]);
                }

                return client.categories.all().fetch();
            })
            .then(function (result) {
                for (var i = 0; i < result.body.results.length; i++) {
                    categories.push(result.body.results[i]);
                }

                res.render('index', {
                    title: 'C+ Hackathlon shop',
                    products: products,
                    categories: categories
                })
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

    // search
    app.get('/search', function(req, res) {
        client.productProjections
            .text(req.query.q)
            .lang('de')
            .search()
            .then(function(result) {
                var products = [];
                //console.log("Results: %d", result.body.total);
                for (var i = 0; i < result.body.results.length; i++) {
                    products.push(result.body.results[i]);
                    console.log("result: %j", result.body.results[i]);
                }

                res.render('search', { title: 'Search for ' + req.params.q, products: products })
            })
            .fail(function(error) {console.log(error.message)});
    })
}