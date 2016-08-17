var Random = require('random-js');
var engine = Random.engines.mt19937().autoSeed();
var distribution = Random.integer(0, 61);
var ALPHA_NUM = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var DEFAULT_LENGTH = 16;

var PrefixedId = function(options) {
    options = options || {};

    var prefixes = options.prefixes;
    var length = options.length;

    if (Array.isArray(prefixes)) {
        this.prefixes = prefixes;
    }
    if (typeof prefixes === 'string') {
        this.prefixes = [prefixes];
    }
    this.prefixes = this.prefixes ||  [];

    if (Number.isInteger(length) && length < 1) {
        throw new Error('id length must be > 0');
    } else if (Number.isInteger(length)) {
        this.length = length;
    } else {
        this.length = DEFAULT_LENGTH;
    }
};

PrefixedId.prototype.new = function(prefix) {
    if (!prefix) {
        if (this.prefixes.length !== 1) {
            throw new Error('missing prefix for id');
        }
        prefix = this.prefixes[0];
    }

    if (this.prefixes.length && !~this.prefixes.indexOf(prefix)){
        throw new Error('invalid prefix ' + prefix + ', valid: ' + this.prefixes);
    }

    var id = '';
    for (var i = 1; i <= this.length; i++) {
        id += ALPHA_NUM[distribution(engine)];
    }

    return prefix + '_' + id;
};

module.exports = PrefixedId;
