const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { mockClient } = require('../../mock-factory');
const ProblemTypes =require('../problem-types');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, async function (args, test) {
    const solutionFilePath = args[0];
    const solution = require(path.resolve(solutionFilePath));
    const client = await mockClient(ProblemTypes.GetAccountEmailAddresses);
    const answer = await solution(client);
    test.equal(typeof solution, 'function', 'you exported a function');
    test.equal(client.didCountEmails(answer), true, "you found the correct number of email addresses");
    test.equal(client.didFindMissingPrimary(answer), true, "you found the email address missing a primary image");
    test.end();
});
