/**
 * Given the state of the game will determine the length of the soundSequence to
 * set the corresponding speed in milliseconds which is passed to the
 * setTimeout() when playing the sequence to repeat.
 * @param {object} state contains all the state information about the game.
 * @return {object} new state object with the gameSpeed property set along with
 * rest of the original state object.
 */
export default function setGameSpeed(state) {
    let len = state.soundSequence.length;
    let speed = 1300;
    if (len >= 5) {
        speed = 1000;
    }
    if (len >= 9) {
        speed = 750;
    }
    if (len >= 13) {
        speed = 500;
    }
    return {...state, gameSpeed: speed};
};