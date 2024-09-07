const venom = require('venom-bot');
const dndDiceRoller = require('./dnd-dice-roller');

venom
    .create({
        session: 'dice-roller', // name of session
        //headless: false
    })
    .then((client) => {    
        console.log('started');
        start(client);
    }) 
    .catch((erro) => {
        console.log(erro);
    });


/**
 * @param client
 * @param {string} sendee
 * @param {string} content
 */
function sendMessage(client, sendee, content) {
    client
        .sendText(sendee, content)
        .then((result) => {
            // Done
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro);
        });
}


function start(client) {
    client.onMessage(async function (message) {
        if (!message || !message.body || !message.from) {
            return;
        }

        let body = message.body.toLowerCase();
        let from = message.from;

        const isDiceRoller = message.groupInfo.name.includes('🎲')
        if (isDiceRoller) {
            let command = body.split(' ');
            switch(command[0]) {
                case '🎲': {
                    let diceNotation = "";
                    for (let i = 1; i < command.length; i++) {
                        diceNotation += command[i];
                    }

                    console.log('rolling ' + diceNotation);

                    try {
                        const content = await dndDiceRoller.getDiceRoll(diceNotation);
                        sendMessage(client, from, content);
                    } catch (e) {
                        sendMessage(client, from, "The dice have shattered in the cup 👀. Check the dice notation: https://tinyurl.com/mrxrwnvp");
                        console.warn(e);

                    }
                } break;

                case '!help': {
                    sendMessage(client, from, "*🎲*: Do a dice roll. eg Roll 3 dice that are 6 sided `🎲 3d6`. Roll a group of dice with modifier `🎲 {2d6 + 1, 1d4}`.");
                } break;
            }
        }

        // Catch ctrl+C
        process.on('SIGINT', function () {
            client.close();
        });

        // Try-catch close
        try {
        } catch (error) {
            client.close();
        }
    });
}
