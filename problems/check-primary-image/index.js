const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { mockClient, ProblemType } = require('../../mock-factory');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, async function (args, test) {
    const solutionFilePath = args[0];
    const solution = require(path.resolve(solutionFilePath));
    test.equal(typeof solution, 'function', 'you exported a function');
    const { client, spies } = await mockClient(ProblemType.CheckPrimaryImage);
    await solution(client);
    let calledExists = spies.existsMethod.calledBefore(spies.removeImageMethod);
    let checkedExistsField = spies.existsProperty.get.calledBefore(spies.removeImageMethod);
    test.equal((calledExists && checkedExistsField), true, "you checked the primary image");
    test.equal(spies.removeImageMethod.calledAfter(spies.existsMethod), true, "you removed the primary image");
    test.equal(spies.existsMethod.calledAfter(spies.removeImageMethod), true, "you checked the primary image again");
    test.end();
});
