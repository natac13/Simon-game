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
