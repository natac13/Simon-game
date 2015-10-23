import random from '../src/js/randomNum';
import range from '../src/js/rangeGen';

describe('random function', function() {
    it('should generate a random number between 1 and 4', function() {
        expect(random(1, 4)).toMatch(/[1-4]/);
    });

    it('should be less than 5', () => {
        expect(random(1, 4)).toBeLessThan(5);
    });
});

describe('range function', function() {
    it('should generate an array', function() {
        expect(range(1, 4)).toEqual([1, 2, 3, 4]);
    });

    it('should generate an array of length 20 with correct params', () => {
        expect(range(1, 20).length).toBe(20);
    });
});

// describe('Game object', function()  {

//     describe('Game setup', function() {
//         beforeEach(function() {
//             game.init();
//         });

//         it('should cache main board element', function()  {
//             expect(game.$board).toBeDefined();
//         });

//         it('should have an undefined sequence to start',function() {
//             expect(game.sequence).toBeUndefined();
//         });
//     });

//     describe('Game call play method', function() {
//         beforeEach(function() {
//             game.play();
//         });

//         it('run play and the sequence is defined', function() {
//             expect(game.sequence).toBeDefined();
//         });

//         it('should have a comp sequence of length 0 after calling play', function() {
//             expect(game.sequence.length).toBe(0);
//         });

//         it('should have user sequence with a length of 0', function() {
//             expect(game.userSeq.length).toBe(0);
//         })
//     });

// });