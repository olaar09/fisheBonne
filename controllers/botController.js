
const replyFirstQuestion = (req, res, next)=>{
    let breakQuest = req.body.question? req.body.question.split("*") : null;

    let request = getQuestion(breakQuest);

    if (request && request === 'buy') {
        let [empty, commandString, quantity, phone] = breakQuest;
        let response  = `Do you want to buy ${quantity} units of token with the phone number ${phone.substring(0, phone.length - 1)} ?`;
        return res.send(response);
    }
    return res.send("I didnt understand your message, Please try again");
};


// helper check correct format
// expects array as argument
// check if a message was sent, and if the message is in the right format
const getQuestion = breakQuest => {

    if (breakQuest && breakQuest.length ===4) {
        let  [notUsed, commandString, quantity] = breakQuest;

        // run through possible command and validate format for the selected command
        switch (commandString){
            case 'buy':
                return commandString === 'buy' && Number.isInteger(parseInt(quantity))? 'buy': false;
            default:
                return false;
        }
    }

    return false;
};

module.exports = replyFirstQuestion;