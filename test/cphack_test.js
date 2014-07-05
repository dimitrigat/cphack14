var should = require('should'),
    cphack = require('../lib/cphack.js')


describe('cphack', function () {
    before(function () {

    })
    it('should be awesome', function(){
        cphack.awesome().should.eql('awesome')
    })
})