const launchRequest = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type == 'Launchrequest';
    },
    handle(handlerInput){
        return handlerInput.responseBuilder
        .speak("TestTest2")
        .getResponse();
    }
}

module.exports = launchRequest;