(function () {
    let appState = {
        isAiPlaying: false, // Whether the "AI" is playing the sequence
        soundSequence: [], // The list of sound IDs to play in order
        userSequence: [], // The list of sound IDs the user has triggered
        gameSpeed: 1000,  // the tempo of setInterval
        round: 1 //  round or how many sounds to play
    };
    let $board = $('#game-board');

    // const cacheDOM = () => {
    //     let $board   = $('#game-board');
    //     let $audio1  = $board.find('#audio1');
    //     let $audio2  = $board.find('#audio2');
    //     let $audio3  = $board.find('#audio3');
    //     let $audio4  = $board.find('#audio4');
    //     let $start   = $board.find('#start');
    //     let $restart = $board.find('#restart');

    // };
    //

    const range = (start, end) => {
        let list = [];
        for (let i = start; i < end + 1; i++) {
            list.push(i);
        }

        return list;
    };

    const random = (min, max) => Math.max(min, Math.floor(Math.random() * (max + 1)));

    const generateRandomSequence = () => range(1, 20).map(() => random(1, 4));

    /*** Reducers ***/

    const generateSequence = (state) => ({...state, soundSequence: generateRandomSequence()});
    const startAiPlaying = (state) => ({...state, isAiPlaying: true});
    const stopAiPlaying = (state) => ({...state, isAiPlaying: false});

    /*** Side effects ***/

    const playSound = (soundId) => {
        console.log('playing ' + soundId);
        //$(`[data-sound-id="${soundId}"]`).trigger('play');
        $board.find(`#audio${soundId}`).trigger('play');
    };

    const playSequence = (state) => {
        state.soundSequence.forEach((soundId, index) => {
            if(index < state.round) {
                setTimeout(() => playSound(soundId), (state.gameSpeed * index));
            }
        });
        console.log(state.soundSequence);
    };

    const start = (state) => {

        let x = state.soundSequence.concat([random(1, 4)]);
        let tmp = ({...state, soundSequence: x});
        // let tmp = appState.round === 1 ? generateSequence(appState) : state;
        playSequence(tmp);
        return tmp;

    };

    const test = (state) => {
        if (state.soundSequence.slice(0, state.userSequence).join('') !== state.userSequence.join('')) {
            return false;
        } else if ( state.soundSequence.length === state.userSequence.length) {
            state.round += 1;
            state.userSequence = [];
            appState = start(state);
            return true;
        }
    };

    const listen = () => {
        // let tmp;
        $board.on('click', '.square', function(event) {
            // let x = state.userSequence.concat([($(event.target).attr('id').slice(-1))]);
            // tmp = {...state, userSequence: x};
            appState.userSequence.push(($(event.target).attr('id').slice(-1)));
            if(test(appState)) {
                listen();
            }

        });
    };

    $board.find('#start').on('click', () => {
        appState = start(appState);
        listen();
    });
    // listen();

    // appState = generateSequence(appState);
    // playSequence(appState.soundSequence);
})();
