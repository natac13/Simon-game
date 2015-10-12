let game = {
    init() {
        this.cacheDOM();
        this.actions();
    },


    play() {
        this.sequence = [];
        this.userSeq = [];
        this.min = 1;
        this.max = 4;
        this.counter = 5; // increase this each time
        this.round = 0;
        this.sim();
    },

    random() {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    },

    cacheDOM() {
        this.$board   = $('#game-board');
        this.$audio1  = this.$board.find('#audio1');
        this.$audio2  = this.$board.find('#audio2');
        this.$audio3  = this.$board.find('#audio3');
        this.$audio4  = this.$board.find('#audio4');
        this.$start   = this.$board.find('#start');
        this.$restart = this.$board.find('#restart');
    },

    actions() {
        this.$start.on('click', this.play.bind(game));
        this.$board.on('mousedown', 'input', this.sound.bind(game));
    },

    sound(event) {
        // console.log(this.id.slice(-1);
        let num = ($(event.target).attr('id').slice(-1));
        this['$audio' + num].trigger('play');
        this.counter += 2;
        console.log(this.counter);
        this.userSeq.push(num);

    },

    x(i) {
        if(this.sequence[i]) {
            this['$audio' + this.sequence[i]].trigger('play');
            this.counter--; // will stop the sim each round
            console.log('i is this: ' +i);
            setTimeout(() => {
                this.sim(i+1);
                console.log('i is this: ' +i);
            }, 1000);
        }
    },

    sim() {
        this.sequence.push(this.random());
        this.x(0);

    }

};

$(document).ready(() => {


    game.init();
});