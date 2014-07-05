module.exports = function(app) {

    //products
    var products = [{name: 'Shirt', price: 12.99}, {name: 'Hose', price: 29.99}]

    SphereClient = require('sphere-node-client');

    var client = new SphereClient({config: {
        'client_id' : 'JrwhqXpdIr1NJOBRIIfmW1dD',
        'client_secret' : 'Dygrpv-Az7vrWxKwzOZq26isKZpW1wBF',
        'project_key' : 'cphack'
    }});

    client.products.all().fetch()
        .then(function(result) {
            var products = [];
            //console.log("Results: %d", result.body.total);
            for (var i = 0; i < result.body.results.length; i++) {
                products.push(result.body.results[i].masterData.current);
                console.log("%j", result.body.results[i].masterData.current);
            }

            // Home/main
            app.get('/', function(req, res) {
                res.render('index', { title: 'C+ Hackathlon shop', products: products })
            })
        })
        .fail(function(error) {console.log(error.message)});

}