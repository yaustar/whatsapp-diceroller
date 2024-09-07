const { DiceRoll } = require('@dice-roller/rpg-dice-roller');

async function getDiceRoll(diceRequest) {
    if (!diceRequest) {
        return "Use dice notation to roll. See https://dice-roller.github.io/documentation/guide/notation/"
    }

    const roll = new DiceRoll(diceRequest);
    return roll.output;
}

module.exports = {
    getDiceRoll: getDiceRoll
};
