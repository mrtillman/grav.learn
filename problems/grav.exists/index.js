const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { ParseContext, ExistsParser } = require('grav.client');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, function (args, t) {
    const f = require(path.resolve(args[0]));
    t.equal(typeof f, 'function', 'you exported a function');
    f().then(data => {
        let res = data;
        if(typeof data == 'string') {
            res = JSON.parse(data);
            const existsParser = new ExistsParser();
            const context = new ParseContext(existsParser);
            res = context.parse(data);
        }
        t.equal(true, Boolean(res.emailHash), 'got email hash')
        t.equal(true, Boolean(res.avatarUrl), 'got avatar url');
        t.end();
    });
});
