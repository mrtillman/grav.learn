const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { ParseContext, AddressParser } = require('grav.client');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, function (args, t) {
    const f = require(path.resolve(args[0]));
    t.equal(typeof f, 'function', 'you exported a function');
    f().then(data => {
        let res = data;
        if(typeof res == 'string'){
            const addressParser = new AddressParser();
            const context = new ParseContext(addressParser);
            res = context.parse(data);
        }
        if(Array.isArray(res)) res = res[0];
        t.equal(true, Boolean(res.email), 'got email')
        t.equal(true, Boolean(res.rating), 'got rating');
        t.equal(true, Boolean(res.userimage), 'got userimage');
        t.equal(true, Boolean(res.userimage_url), 'got userimage_url');
        t.end();
    });
});
