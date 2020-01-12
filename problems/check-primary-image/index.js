const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { mockClient } = require('../../test-doubles/mock-factory');
const ProblemTypes =require('../problem-types');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, async function (args, test) {
    const solutionFilePath = args[0];
    const solution = require(path.resolve(solutionFilePath));
    const client = await mockClient(ProblemTypes.CheckPrimaryImage);
    await solution(client);
    test.equal(typeof solution, 'function', 'you exported an async function');
    test.equal(client.didCheckPrimaryImage(), true, "you checked if the primary image exists");
    test.equal(client.didRemovePrimaryImage(), true, "you removed the primary image");
    test.equal(client.didCheckPrimaryImageAgain(), true, "you checked the primary image again");
    test.end();
});
