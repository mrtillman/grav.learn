const sinon = require('sinon');
const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { GravatarClient } = require('grav.client');
const { ExistsMethodResponse, RemoveImageMethodResponse } = require('grav.client/Release/Domain/method-responses');
const { Result } = require('grav.client/Release/Common/result');
const stub = require('grav.client/Release/Common/TestDoubles/json-response-stubs');

function existsResult(useSuccess){
    const response = new ExistsMethodResponse("");
    response.json = stub.existsJsonResponse;
    if(!useSuccess){
        response.json.methodResponse.params.param
        .value.struct.member.value.int._text = "0";
    }
    response.parseMembers();
    return Promise.resolve(Result.Ok(response));
}

function removeImageResult(){
    const response = new RemoveImageMethodResponse("");
    response.json = stub.removeImageJsonResponse;
    response.parseMembers();
    return Promise.resolve(Result.Ok(response));
}

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, async function (args, test) {
    const solutionFilePath = args[0];
    const solution = require(path.resolve(solutionFilePath));
    test.equal(typeof solution, 'function', 'you exported a function');
    const client = new GravatarClient();
    client.emailHash = "1a9e97710a2477b1040d332e9e815cca";
    const existsMethod = sinon.stub();
    const removeImageMethod = sinon.stub();
    existsMethod.onFirstCall().returns(existsResult(true));
    existsMethod.onSecondCall().returns(existsResult(false));
    removeImageMethod.onFirstCall().returns(removeImageResult());
    client.exists = existsMethod;
    client.removeImage = removeImageMethod;
    await solution(client);
    test.equal(existsMethod.calledBefore(removeImageMethod), true, "you checked if the primary image exists");
    test.equal(removeImageMethod.called, true, "you removed the primary image");
    test.equal(existsMethod.calledAfter(removeImageMethod), true, "you checked if the primary image exists again");
    test.end();
});
