#!/usr/bin/env node

const adventure = require('adventure');
const shop = adventure('grav.learn');

const problems = [ 
    { title:'IMAGE CHECK', name:'image-check' },
    { title:'DEFAULT ICON', name:'default-icon' },
];

problems.forEach(function (prob) {
    shop.add(prob.title, function () { return require('./problems/' + prob.name) });
});

shop.execute(process.argv.slice(2));
