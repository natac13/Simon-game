/**
 * given the soundId and a wrapper element will find the panel with an id = btn
 * and the soundId number
 * @param  {string} soundId string version of the number from the attribute look
 *                          up when a panel is clicked of triggered to click
 * @param  {jQuery element} wrapper around the panel elements and audio elements
 */
export default function highlight(soundId, wrapper) {
    wrapper.find(`#btn${soundId}`).addClass('highlight');
    setTimeout(() => {
        wrapper.find(`#btn${soundId}`).removeClass('highlight');
    }, 550);
}