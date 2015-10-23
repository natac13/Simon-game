import range  from './rangeGen';
import random from './randomNum';

(function() {
    let appState = {
        isAiPlaying: false, // Whether the "AI" is playing the sequence
        soundSequence: [], // The list of sound IDs to play in order
        userSequence: [], // The list of sound IDs the user has triggered
        gameSpeed: 1500,  // the tempo of setInterval
        round: 1 //  round or how many sounds to play
    };
    let $board = $('#game-board');


    const generateRandomSequence = () => range(1, 20).map(() => random(1, 4));
    console.log(generateRandomSequence());

    /*** Reducers ***/

    const generateSequence = (state) => ({...state, soundSequence: generateRandomSequence()});
    const startAiPlaying = (state) => ({...state, isAiPlaying: true});
    const stopAiPlaying = (state) => ({...state, isAiPlaying: false});

    /*** Side effects ***/

    const highlight = (soundId) => {
        $board.find(`#btn${soundId}`).addClass('active');
        setTimeout(() => {
            $board.find(`#btn${soundId}`).removeClass('active');
        }, 400);
    };

    const playSound = (soundId) => {
        console.log('playing ' + soundId);
        //$(`[data-sound-id="${soundId}"]`).trigger('play');
        highlight(soundId);
        $board.find(`#audio${soundId}`).trigger('play');
    };

    const setGameSpeed = (state) => {
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

    const playSequence = (state) => {
        state = setGameSpeed(state);
        console.log(state.gameSpeed);
        state.soundSequence.forEach((soundId, index) => {
            if(index < state.round) {
                setTimeout(() => playSound(soundId), (state.gameSpeed * index));
            }
        });
    };

    const start = (state) => {

        let x = state.soundSequence.concat([random(1, 4)]);
        console.log(x);
        let tmp = ({...state, soundSequence: x});
        // let tmp = appState.round === 1 ? generateSequence(appState) : state;
        playSequence(tmp);
        return tmp;

    };

    const test = (state) => {
        console.log('sound ' + state.soundSequence);
        console.log('user ' +state.userSequence);
        if (state.soundSequence.slice(0, state.userSequence.length).join('') != state.userSequence.join('')) {
            console.log('here1');
            appState = reset(state); // reset the state on fail
            return false;
        } else if ( state.soundSequence.length === state.userSequence.length) {
            console.log('here2');
            state.round += 1;
            state.userSequence = [];
            setTimeout(() => {
                appState = start(state);
            }, 1000);

            return true;
        }
    };

    const reset = (state) => {
        return {
            ...state,
            soundSequence: [],
            userSequence: [],
            round: 1
        };
    };

    // const listen = () => {
        // let tmp;
    //     $board.on('mouseup', '.square', function(event) {
    //         // let x = state.userSequence.concat([($(event.target).attr('id').slice(-1))]);
    //         // tmp = {...state, userSequence: x};
    //         appState.userSequence.push(($(event.target).attr('id').slice(-1)));
    //         test(appState);

    //     });
    // };

    $board.find('#start').on('click', () => {
        appState = start(appState);
        // listen();

    });
    $board.find('#restart').on('click', () => {
        appState = reset(appState);
    });
    // listen();
    $board.on('click', '.square', function(event) {
            // let x = state.userSequence.concat([($(event.target).attr('id').slice(-1))]);
            // tmp = {...state, userSequence: x};
            let num = $(event.target).attr('id').slice(-1);
            playSound(num);
            appState.userSequence.push(num);
            test(appState);

        });

    // appState = generateSequence(appState);
    // playSequence(appState.soundSequence);


    // export {range, random, generateRandomSequence};
})();

