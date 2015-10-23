 /*** Sequence ***/
import range  from './rangeGen';
import random from './randomNum';

 /*** State setup ***/
import setGameSpeed from './gameSpeed';

 /*** Actions ***/
import playSequence from './playSequence';
import playSound    from './playSound';
import highlight    from './highlight';

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


    /*** Reducers ***/

    const generateSequence = (state) => ({...state, soundSequence: generateRandomSequence()});
    const startAiPlaying = (state) => ({...state, isAiPlaying: true});
    const stopAiPlaying = (state) => ({...state, isAiPlaying: false});


    const start = (state) => {

        let x = state.soundSequence.concat([random(1, 4)]);
        console.log(x);
        let tmp = ({...state, soundSequence: x});
        // let tmp = appState.round === 1 ? generateSequence(appState) : state;
        playSequence(tmp, $board);
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
            playSound(num, $board);
            appState.userSequence.push(num);
            test(appState);

        });

    // appState = generateSequence(appState);
    // playSequence(appState.soundSequence);


    // export {range, random, generateRandomSequence};
})();

