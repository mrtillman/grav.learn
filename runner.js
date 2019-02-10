#!/usr/bin/env node

const adventure = require('adventure');
const shop = adventure('grav.learn');

const problems = [ 'grav.exists', 'grav.address', 'grav.test' ];

problems.forEach(function (prob) {
    shop.add(prob, function () { return require('./problems/' + prob) });
});

shop.execute(process.argv.slice(2));
