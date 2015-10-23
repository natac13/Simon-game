import random       from './randomNum';

/**
 * Given the state of the game will add a random number to the soundSequence
 * @param  {object} state properties are the state the game is in
 * @return {object}       new object which adds one random number to the
 * soundSequence and the rest of the original state.
 */
export default function addSound(state) {
    let x = state.soundSequence.concat([random(1, 4)]);

    let tmp = ({...state, soundSequence: x});
    return tmp;
}