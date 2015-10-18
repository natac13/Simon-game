describe('Game object', function()  {

    describe('Game setup', function() {
        beforeEach(function() {
            game.init();
        });

        it('should cache main board element', function()  {
            expect(game.$board).toBeDefined();
        });

        it('should have an undefined sequence to start',function() {
            expect(game.sequence).toBeUndefined();
        });
    });

    describe('Game call play method', function() {
        beforeEach(function() {
            game.play();
        });

        it('run play and the sequence is defined', function() {
            expect(game.sequence).toBeDefined();
        });

        it('should have a comp sequence of length 0 after calling play', function() {
            expect(game.sequence.length).toBe(0);
        });

        it('should have user sequence with a length of 0', function() {
            expect(game.userSeq.length).toBe(0);
        })
    });

});