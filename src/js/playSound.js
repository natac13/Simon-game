import highlight from './highlight';


export default function playSound(soundId, wrapper) {
    console.log('playing ' + soundId);
    //$(`[data-sound-id="${soundId}"]`).trigger('play');
    highlight(soundId, wrapper);
    wrapper.find(`#audio${soundId}`).trigger('play');
}