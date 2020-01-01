const adventure = require('adventure');
const shop = adventure('grav.learn');

const problems = [ 
    { title:'CHECK PRIMARY IMAGE', name:'check-primary-image' },
    { title:'SET DEFAULT ICON', name:'set-default-icon' },
];

problems.forEach(function (prob) {
    shop.add(prob.title, function () { return require('./problems/' + prob.name) });
});

shop.execute(process.argv.slice(2));
