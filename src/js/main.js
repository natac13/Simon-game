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
    let seqID;


    const generateRandomSequence = () => range(1, 20).map(() => random(1, 4));

    const testSequence = (state) => {
        if (state.soundSequence.slice(0, state.userSequence.length).join('') != state.userSequence.join('')) {
            /*** Loss ***/

            /*** Display ***/
            if (appState.strict) {
                appState = restart(state);
                $board.find('#status').text('Wrong start over');
            }
            $board.find('#status').text('Wrong try again');
            /*** State ***/
            appState = resetUserSeq(appState);
            setTimeout(() => {
                playSequence(appState, $board);
            }, 500);
            return false;
        } else if ( state.soundSequence.length === state.userSequence.length) {
            /*** Handle a win ***/

            /*** Display ***/
            if (state.soundSequence.length == 20) {
                $board.find('#status').text('You Won');
                appState = restart(appState);
                updateRound('--', $board);
            }
            $board.find('#status').text('Playing');
            /*** State ***/
            state.round += 1;
            // if(state.round == 2) {
            //     $board.find('#btn3').animate({
            //         left: '-=27.5em'
            //     });
            //     $board.find('#btn1').animate({
            //         left: '+27.5em'
            //     });
            // }
            // if(state.round == 3) {
            //     $board.find('#btn2').animate({
            //         right: '-=27.5em'
            //     });
            //     $board.find('#btn4').animate({
            //         left: '-=27.5em'
            //     });
            // }
            state.userSequence = [];
            setTimeout(() => {
                updateRound(state.round, $board);
                appState = addSound(state);
                playSequence(appState, $board);
            }, 1000);

            return true;
        }
    }


    $board.find('#start').on('click', () => {
        /*** Display ***/
        $board.find('.square').prop('disabled', false);
        $board.find('#status').text('Playing');
        /*** State ***/
        appState = addSound(appState);
        playSequence(appState, $board);
        updateRound(appState.round, $board);

    });
    $board.find('#restart').on('click', () => {
        /*** Display ***/
        $board.find('.square').prop('disabled', true);
        $board.find('#status').text('Restarting');
        /*** State ***/
        appState = restart(appState);
        updateRound('--', $board);
    });
    $board.on('mouseup', '.square', function(event) {
            let num = $(event.target).attr('id').slice(-1);
            playSound(num, $board);
            appState.userSequence.push(num);
            testSequence(appState, $board);

        });
})();

