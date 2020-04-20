const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { mockClient } = require('../../test-doubles/mock-factory');
const ProblemTypes = require('../problem-types');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, async function (args, test) {
    const solutionFilePath = args[0];
    const solution = require(path.resolve(solutionFilePath));
    const client = await mockClient(ProblemTypes.NewPrimary);
    const answer = await solution(client);
    test.equal(typeof solution, 'function', 'you exported an async function');
    test.equal(client.didSaveImage(), true, "you uploaded an image");
    test.equal(client.didSetPrimary(), true, "you set the primary image");
    test.equal(client.didGetPrimaryImageUrl(answer), true, "you got the primary image url");
    test.end();
});
