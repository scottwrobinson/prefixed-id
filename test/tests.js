var expect  = require('chai').expect;
var PrefixedId = require('../lib');

describe('with no accepted prefix list', function() {
    var id_generator;
    before(function() {
        id_generator = new PrefixedId();
    });

    it ('should generate id with provided prefix', function() {
        var id = id_generator.new('cus');
        expect(id).to.have.length(20);
        expect(id).to.match(/^cus_[a-zA-Z0-9]{16}$/);
    });

    it ('should throw if no prefix is provided', function() {
        expect(function() {
            id_generator.new();
        }).to.throw(Error, /missing prefix for id/);
    });
});

describe('with accepted prefix list', function() {
    var id_generator;
    before(function() {
        id_generator = new PrefixedId({prefixes:['cus', 'con']});
    });

    it ('should generate id if prefix is in list', function() {
        var id = id_generator.new('cus');
        expect(id).to.have.length(20);
        expect(id).to.match(/^cus_[a-zA-Z0-9]{16}$/);
    });

    it ('should throw prefix is not in list', function() {
        expect(function() { id_generator.new('cli'); }).to.throw(Error, /invalid prefix cli, valid: cus,con/);
    });
});

describe('with one accepted prefix', function() {
    var id_generator;
    before(function() {
        id_generator = new PrefixedId({prefixes:'cus'});
    });

    it ('should generate the id with the default prefix', function() {
        var id = id_generator.new();
        expect(id).to.have.length(20);
        expect(id).to.match(/^cus_[a-zA-Z0-9]{16}$/);
    });
});

describe('with non-default length', function() {
    var id_generator;
    before(function() {
        id_generator = new PrefixedId({length:24});
    });

    it ('should generate id with alphanumeric length of 24 characters', function() {
        var id = id_generator.new('cus');
        expect(id).to.have.length(28);
        expect(id).to.match(/^cus_[a-zA-Z0-9]{24}$/);
    });
});