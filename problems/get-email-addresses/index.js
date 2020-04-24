const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { mockClient } = require('../../test-doubles/mock-factory');
const ProblemTypes =require('../problem-types');
const marked = require('../../theme');

exports.problem = marked(fs.readFileSync(__dirname + '/problem.md').toString());
exports.solution = marked(fs.readFileSync(__dirname + '/solution.md').toString());

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
