const dndDiceRoller = require('./dnd-dice-roller');

(async function() {
    let result = await dndDiceRoller.getDiceRoll("");
    console.log(result);
    result = await dndDiceRoller.getDiceRoll("2d6 // ice damage");
    console.log(result);
    result = await dndDiceRoller.getDiceRoll("{2d6, 1d4}");
    console.log(result);
    result = await dndDiceRoller.getDiceRoll("{2d6 + 1, 1d4}");
    console.log(result);

    const testCommand = "🎲 {2d6 + 1, 1d4}";
    let command = testCommand.split(' ');
    let diceNotation = ""
    for (let i = 1; i < command.length; i++) {
        diceNotation += command[i];
    }

    result = await dndDiceRoller.getDiceRoll("{2d6 + 1, 1d4}");
    console.log(result);
})();
