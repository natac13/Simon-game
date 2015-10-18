(function () {
    let appState = {
        isAiPlaying: false, // Whether the "AI" is playing the sequence
        soundSequence: [], // The list of sound IDs to play in order
        userSequence: [] // The list of sound IDs the user has triggered
    };

    const range = (start, end) => {
        let list = [];
        for (let i = start; i < end + 1; i++) {
            list.push(i);
        }

        return list;
    };

    const random = (min, max) => Math.max(min, Math.floor(Math.random() * (max + 1)));

    const generateRandomSequence = () => range(1, 4).map(() => random(1, 4));

    /*** Reducers ***/

    const generateSequence = (state) => ({...state, soundSequence: generateRandomSequence()});
    const startAiPlaying = (state) => ({...state, isAiPlaying: true});
    const stopAiPlaying = (state) => ({...state, isAiPlaying: false});

    /*** Side effects ***/

    const playSound = (soundId) => {
        console.log('playing ' + soundId);
        //$(`[data-sound-id="${soundId}"]`).trigger('play');
    };

    const playSequence = sequence => sequence.forEach(soundId => playSound(soundId));

    appState = generateSequence(appState);
    playSequence(appState.soundSequence);
})();
