let game = {
        init() {
            this.cacheDOM();
            this.actions();
        },

        generateSequence() {
            for(let i = 0; i < 20; i++) {
                this.sequence.push(this.random());
            }
            console.log(this.sequence);
        },

        play() {
            this.sequence = [];
            this.min = 1;
            this.max = 4;
            this.counter = 5; // increase this each time
            this.round = 0;
            this.generateSequence();
            this.sim(this.round);
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
            this.sim(0);

        },

        sim(i) {
            if(this.sequence[i] && this.counter > 0) {
                this['$audio' + this.sequence[i]].trigger('play');
                this.counter--; // will stop the sim each round
                setTimeout(() => {
                    this.sim(i+1);
                }, 1000);
            }
        }

    };

$(document).ready(() => {


    game.init();
});