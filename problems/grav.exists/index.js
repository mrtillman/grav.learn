const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, function (args, test) {
    const solutionFilePath = args[0];
    const solution = require(path.resolve(solutionFilePath));
    test.equal(typeof solution, 'function', 'you exported a function');
    solution().then(result => {
        const didSucceed = result.DidSucceed;
        let primaryImageIsSet = false;
        if(didSucceed){
            const { exists } = result.Value;
            const emailHashes = Object.keys(exists);
            primaryImageIsSet = emailHashes.every(hash => exists[hash]);
        }
        test.equal(didSucceed, true, 'method call succeeded');
        test.equal(primaryImageIsSet, true, 'primary image is set');
        test.end();
    });
});
