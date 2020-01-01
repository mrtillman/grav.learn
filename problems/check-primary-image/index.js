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
    response.parseMembers();
    response.exists = useSuccess;
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
    const existsMethod = sinon.stub();
    const existsResponse = await existsResult(true);
    const existsProperty = sinon.spy(existsResponse.Value, "exists", ["get"]);
    const removeImageMethod = sinon.stub();
    existsMethod.onFirstCall().returns(Promise.resolve(existsResponse));
    existsMethod.onSecondCall().returns(existsResult(false));
    removeImageMethod.onFirstCall().returns(removeImageResult());
    client.exists = existsMethod;
    client.removeImage = removeImageMethod;
    await solution(client);
    let calledExists = existsMethod.calledBefore(removeImageMethod);
    let checkedExistsField = existsProperty.get.calledBefore(removeImageMethod);
    test.equal((calledExists && checkedExistsField), true, "you checked the primary image");
    test.equal(removeImageMethod.calledAfter(existsMethod), true, "you removed the primary image");
    test.equal(existsMethod.calledAfter(removeImageMethod), true, "you checked the primary image again");
    test.end();
});
