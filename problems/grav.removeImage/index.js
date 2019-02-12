const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { ParseContext, RemoveImageParser } = require('grav.client');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, function (args, t) {
    const f = require(path.resolve(args[0]));
    t.equal(typeof f, 'function', 'you exported a function');
    f().then(data => {
        let res = data;
        if(typeof res == 'string'){
            const removeImageParser = new RemoveImageParser();
            const context = new ParseContext(removeImageParser);
            res = context.parse(data);
        }
        t.equal(true, res.response, 'removed primary avatar');
        t.end();
    });
});
