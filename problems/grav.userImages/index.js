const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { ParseContext, UserImagesParser } = require('grav.client');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, function (args, t) {
    const f = require(path.resolve(args[0]));
    t.equal(typeof f, 'function', 'you exported a function');
    f().then(data => {
        let res = data;
        if(typeof res == 'string'){
            const userImagesParser = new UserImagesParser();
            const context = new ParseContext(userImagesParser);
            res = context.parse(data);
        }
        t.equal(true, Array.isArray(res), 'got collection of images')
        const image = res[0];
        t.equal(true, Boolean(image.name), 'got image name')
        t.equal(true, Boolean(image.url), 'got image url')
        t.end();
    });
});
