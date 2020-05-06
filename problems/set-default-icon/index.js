const sinon = require('sinon');
const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const client = require("../../test-doubles/mock-client");
const marked = require('../../theme');
const { Response } = require('../../node_modules/grav.client/Release/Common/result');

exports.problem = marked(fs.readFileSync(__dirname + '/problem.md').toString());
exports.solution = marked(fs.readFileSync(__dirname + '/solution.md').toString());

exports.verify = verify({ modeReset: true }, async function (args, test) {
    const solutionFilePath = args[0];
    const solution = require(path.resolve(solutionFilePath));
    const existsMethod = sinon.stub();
    const removeImageMethod = sinon.stub();
    existsMethod.returns(Response.Ok({success: true}));
    client.exists = existsMethod;
    client.removeImage = removeImageMethod;
    await solution(client);
    test.equal(typeof solution, 'function', 'you exported an async function');
    test.equal(removeImageMethod.called, true, "you set the default icon");
    test.end();
});
