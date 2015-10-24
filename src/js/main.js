/*** Sequence ***/
import range        from './rangeGen';
import random       from './randomNum';
import restart      from './restart';
import resetUserSeq from './resetUser';

/*** Game Actions ***/
import playSequence from './playSequence';
import playSound    from './playSound';
import addSound     from './addSound';

/*** Display ***/
import updateRound  from './updateRound';

(function() {
    let appState = {
        soundSequence: [], // The list of sound IDs to play in order
        userSequence: [], // The list of sound IDs the user has triggered
        gameSpeed: 1500,  // the tempo of setInterval
        round: 1, //  round or how many sounds to play
        strict: false
    };
    let $board = $('#game-board');


    const generateRandomSequence = () => range(1, 20).map(() => random(1, 4));


    const test = (state) => {
        // console.log('sound ' + state.soundSequence);
        // console.log('user ' + state.userSequence);
        if (state.soundSequence.slice(0, state.userSequence.length).join('') != state.userSequence.join('')) {
            // console.log('fail');
            if(appState.strict) {appState = restart(state);}
            alert('Wrong');
            appState = resetUserSeq(appState);
            setTimeout(() => {
                playSequence(appState, $board);
            }, 500);
            return false;
        } else if ( state.soundSequence.length === state.userSequence.length) {
            // console.log('passed round');
            state.round += 1;
            state.userSequence = [];
            setTimeout(() => {
                updateRound(state.round, $board);
                appState = addSound(state);
                playSequence(appState, $board);
            }, 1000);

            return true;
        }
    };

    $board.find('#start').on('click', () => {
        appState = addSound(appState);
        // console.log(appState);
        playSequence(appState, $board);
        updateRound(appState.round, $board);

    });
    $board.find('#restart').on('click', () => {
        appState = restart(appState);
        updateRound('--', $board);
    });
    $board.on('mouseup', '.square', function(event) {
            let num = $(event.target).attr('id').slice(-1);
            playSound(num, $board);
            appState.userSequence.push(num);
            test(appState);

        });
})();

