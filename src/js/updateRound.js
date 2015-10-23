/**
 * Given the round number from the appState.round and the $board wrapper element
 * this will find the element with id of round to modify it's text to the new
 * round number
 * @param  {string} round   round number in string form
 * @param  {jQuery element} wrapper element that acts as a game board
 */
export default function updateRound(round, wrapper) {
    wrapper.find('#round').text(round + '');
}