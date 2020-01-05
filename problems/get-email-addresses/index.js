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
    const client = await mockClient(ProblemTypes.GetEmailAddresses);
    const answer = await solution(client);
    test.equal(typeof solution, 'function', 'you exported an async function');
    test.equal(client.didCountEmails(answer), true, "you counted the email addresses");
    test.equal(client.didFindMissingPrimary(answer), true, "you found the email address missing a primary image");
    test.end();
});
