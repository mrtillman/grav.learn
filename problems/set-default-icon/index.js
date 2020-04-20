const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { GravatarClient } = require('grav.client');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, async function (args, test) {
    const solutionFilePath = args[0];
    const solution = require(path.resolve(solutionFilePath));
    const client = new GravatarClient();
    const removeImageMethod = sinon.stub();
    client.removeImage = removeImageMethod;
    client.saveImageUrl = sinon.stub();
    client.useUserImage = sinon.stub();
    await solution(client);
    test.equal(typeof solution, 'function', 'you exported an async function');
    test.equal(removeImageMethod.called, true, "you set the default icon");
    test.end();
});
