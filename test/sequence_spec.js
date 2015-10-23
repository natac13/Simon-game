import addSound from '../src/js/addSound';

describe('Adding sound(number) to the soundSequence of the state', function() {
    let appState;
    beforeEach(function() {
        appState = {
            soundSequence: [], // The list of sound IDs to play in order
            userSequence: [], // The list of sound IDs the user has triggered
            gameSpeed: 1500,  // the tempo of setInterval
            round: 1, //  round or how many sounds to play
            strict: false
        }
    });

    it('should be length 0 when first initialize', function() {
        expect(appState.soundSequence.length).toBe(0);
    });

    it('should be length 1 after one call to addSound', function() {
        appState = addSound(appState);
        expect(appState.soundSequence.length).toBe(1);
    });

    it('should be of length 10 after 10 calls', function () {
        for(let i = 0; i < 10; i++) {
            appState = addSound(appState);
        }
        expect(appState.soundSequence.length).toBe(10);

    })
});