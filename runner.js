#!/usr/bin/env node

const adventure = require('adventure');
const shop = adventure('grav.learn');

const problems = [ 
    'grav.exists', 'grav.addresses', 'grav.userImages', 
    'grav.saveImage', 'grav.saveEncodedImage', 'grav.saveUrl',
    'grav.useUserImage', 'grav.removeImage', 'grav.deleteUserImage',
    'grav.test'
     ];

problems.forEach(function (prob) {
    shop.add(prob, function () { return require('./problems/' + prob) });
});

shop.execute(process.argv.slice(2));
