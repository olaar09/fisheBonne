const mongoose = require("mongoose");
const Promise = require("promise");


const questionSchema = mongoose.Schema({
    question: {type: {}, required: true},
    phone: {type: String, required: true},
    status: {type: String, default: 'pending'},
    Date: {type: Date, default: new Date()},
});

const questionModel = mongoose.model('user_question', questionSchema);

const replyFirstQuestion = (req, res, next) => {
    let breakQuest = req.body.question ? req.body.question.split("*") : null;

    let request = getQuestion(breakQuest);

    if (request && request === 'buy') {
        let [empty, commandString, quantity, phone] = breakQuest;
        phone = phone.substring(0, phone.length - 1);

        let response = `Do you want to buy ${quantity} units of token with the phone number ${phone} ?`;

        saveQuestionDb(phone, {commandString, quantity}).then((returnedData) => {
            // data already returned..
            res.send({response});
        })

    } else {
        return res.send("I didnt understand your message, Please try again");
    }
};


// helpers and models
// helper check correct format
// expects array as argument
// check if a message was sent, and if the message is in the right format
const getQuestion = breakQuest => {

    if (breakQuest && breakQuest.length === 4) {
        let [notUsed, commandString, quantity] = breakQuest;

        // run through possible command and validate format for the selected command
        switch (commandString) {
            case 'buy':
                return commandString === 'buy' && Number.isInteger(parseInt(quantity)) ? 'buy' : false;
            default:
                return false;
        }
    }

    return false;
};


const saveQuestionDb = (phone, question) => {

    let newQuestion = new questionModel({
        question: question,
        phone: phone
    });
    return newQuestion.save();
};

module.exports = replyFirstQuestion;