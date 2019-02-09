#!/usr/bin/env node

var adventure = require('adventure');
var shop = adventure('example-adventure');

var problems = [ 'grav.exists', 'grav.address', 'grav.test' ];
problems.forEach(function (prob) {
    shop.add(prob, function () { return require('./problems/' + prob) });
});

shop.execute(process.argv.slice(2));
