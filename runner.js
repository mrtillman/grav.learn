const adventure = require('adventure');
const shop = adventure('grav.learn');

const problems = [ 
    { title: 'CHECK PRIMARY IMAGE', name: 'check-primary-image' },
    { title: 'GET EMAIL ADDRESSES', name: 'get-email-addresses' },
    { title: 'FIND IMAGES', name: 'find-images' },
    { title: 'UPLOAD X-RATED IMAGE', name: 'x-rated-image' },
    { title: 'SET NEW PRIMARY IMAGE', name: 'new-primary' },
    { title: 'LOAD PREVIOUS IMAGE', name: 'load-previous-image' },
    { title: 'LOAD NEXT IMAGE', name: 'load-next-image' },
    { title: 'SET DEFAULT ICON', name: 'set-default-icon' }
];

problems.forEach(function (prob) {
    shop.add(prob.title, function () { return require('./problems/' + prob.name) });
});

shop.execute(process.argv.slice(2));
