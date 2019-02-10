const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { ParseContext, TestParser } = require('grav.client');
const creds = require('../../creds');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, function (args, t) {
    const f = require(path.resolve(args[0]));
    t.equal(typeof f, 'function', 'you exported a function');
    f().then(data => {
        let res = data;
        if(typeof res == 'string'){
            const testParser = new TestParser();
            const context = new ParseContext(testParser);
            res = context.parse(data);
        }
        t.equal(true, Boolean(res.response), 'got a response')
        t.end();
    });
});
