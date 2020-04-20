#!/usr/bin/env node

const adventure = require('adventure');
const shop = adventure({ name: 'grav.learn', autoclose: false });

const problems = [ 
    { title: '0. CHECK PRIMARY IMAGE', name: 'check-primary-image' },
    { title: '1. GET EMAIL ADDRESSES', name: 'get-email-addresses' },
    { title: '2. FIND IMAGES', name: 'find-images' },
    { title: '3. FIND SINGLE IMAGE', name: 'find-single-image' },
    { title: '4. UPLOAD X-RATED IMAGE', name: 'x-rated-image' },
    { title: '5. SET NEW PRIMARY IMAGE', name: 'new-primary' },
    { title: '6. LOAD PREVIOUS IMAGE', name: 'load-previous-image' },
    { title: '7. LOAD NEXT IMAGE', name: 'load-next-image' },
    { title: '8. SET DEFAULT ICON', name: 'set-default-icon' },
    { title: '9. CREATE A USE CASE', name: 'create-use-case' }
];

problems.forEach(function (prob) {
    shop.add(prob.title, function () { return require('./problems/' + prob.name) });
});

shop.execute(process.argv.slice(2));
