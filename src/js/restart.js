/**
 * Given the state of the game object this will return a new object with the
 * both sequences as empty arrays and the round at 1
 * @param  {object} state game information
 * @return {object}       new state object of information
 */
export default function restart(state) {
    return {
            ...state,
            soundSequence: [],
            userSequence: [],
            round: 1
        };
}