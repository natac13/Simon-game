import highlight from './highlight';


export default function playSound(soundId, wrapper) {
    highlight(soundId, wrapper);
    console.log(`playing: #audio${soundId}`);
    wrapper.find(`#audio${soundId}`).trigger('play');
}