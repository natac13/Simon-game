import setGameSpeed from '../src/js/gameSpeed';

describe('Setting of the Game Speed in milliseconds of the appState object', function() {
    it('should be 1300 when soundSequence is less than 5', function() {
        let appState = {
            soundSequence: [1, 2, 3, 4]
        };
        expect(appState.gameSpeed).toBeUndefined();
        appState = setGameSpeed(appState);
        expect(appState.gameSpeed).toEqual(1300);
    });

    it('should set the speed to 1000 when the soundSequence is between a length of 5 and 8', function() {
        let appState = {
            soundSequence: [1, 2, 3, 4, 5, 6, 7]
        }
        expect(appState.gameSpeed).toBeUndefined();
        appState = setGameSpeed(appState);
        expect(appState.gameSpeed).toEqual(1000);
    });

    it('should set the speed to 750 when the soundSequence is between a length of 9 and 12', function() {
        let appState = {
            soundSequence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
        expect(appState.gameSpeed).toBeUndefined();
        appState = setGameSpeed(appState);
        expect(appState.gameSpeed).toEqual(750);
    });

    it('should set the speed to 500 when the soundSequence is length 13 or greater', function() {
        let appState = {
            soundSequence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        }
        expect(appState.gameSpeed).toBeUndefined();
        appState = setGameSpeed(appState);
        expect(appState.gameSpeed).toEqual(500);
    });
});