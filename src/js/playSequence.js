import setGameSpeed from './gameSpeed';
import playSound    from './playSound';

/**
 * Given the state object will first call setGameSpeed then using the forEach()
 * function place a setTimeout() call on the stack base off that speed and the
 * index value from the soundSequence array
 * @param  {object} state info about the game state
 * @param  {jQuery element} this is the wrapper element for the audio files and
 *                          panel buttons to highlight
 */
export default function playSequence(state, wrapper) {
    state = setGameSpeed(state);
    console.log(state.gameSpeed);
    state.soundSequence.forEach((soundId, index) => {
        if(index < state.round) {
            setTimeout(() => playSound(soundId, wrapper),
                (state.gameSpeed * index));
        }
    });
};