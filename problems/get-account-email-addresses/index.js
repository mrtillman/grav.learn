const sinon = require('sinon');
const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { GravatarClient } = require('grav.client');
const { AddressesMethodResponse } = require('grav.client/Release/Domain/method-responses');
const { Result } = require('grav.client/Release/Common/result');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

const emailAddresses = [
    { imageRating:0, email: "scato@example.com", imageName: "4ddf23534256fb555cfbf10acd7728b2", imageUrl: "http://en.gravatar.com/userimage/000000/4ddf23534256fb555cfbf10acd7728b2" },
    { imageRating:0, email: "penna@example.com", imageName: null, imageUrl: null },
    { imageRating:0, email: "muzzy@example.com", imageName: "0fa6e24a27f544abb2536746b5b9d5f0", imageUrl: "http://en.gravatar.com/userimage/000000/0fa6e24a27f544abb2536746b5b9d5f0" },
];

exports.verify = verify({ modeReset: true }, async function (args, test) {
    const solutionFilePath = args[0];
    const solution = require(path.resolve(solutionFilePath));
    test.equal(typeof solution, 'function', 'you exported a function');
    const client = new GravatarClient();
    const response = new AddressesMethodResponse("");
    response.userAddresses = emailAddresses;
    const addressesMethod = sinon.stub();
    addressesMethod.returns(Promise.resolve(Result.Ok(response)));
    client.addresses = addressesMethod;
    const answer = await solution(client);
    const isCorrectEmailCount = (answer.addressCount == emailAddresses.length);
    const didCallAddressesMethod = addressesMethod.called;
    const addressMissingPrimaryImage = emailAddresses.find(
        address => !address.imageName
    ).email;
    test.equal(isCorrectEmailCount && didCallAddressesMethod, true, "you found the correct number of email addresses");
    test.equal(answer.addressMissingPrimaryImage == addressMissingPrimaryImage, true, "you found the email address missing a primary image");
    test.end();
});
