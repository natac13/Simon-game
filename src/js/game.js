let game = {
    init() {
        this.cacheDOM();
        this.actions();
        this.userSeq = [];
        this.sequence = [];
    },


    play() {

        this.playing = true;
        this.timeID;
        this.userWaitID;
        this.min = 1;
        this.max = 4;
        this.counter = 1; // increase this each time
        this.round = 0;
        this.sim(0);
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
        this.$board.on('mouseup', '.square', this.sound.bind(game));
        this.$board.on('mousedown', '.square', function() {
            console.log(this);
            $(this).addClass('active');
            setTimeout(() => {
                $(this).removeClass('active');
            }, 700);
        });
    },

    sound(event) {
        // console.log(this.id.slice(-1);
        let num = ($(event.target).attr('id').slice(-1));
        this['$audio' + num].trigger('play');
        console.log(this.counter);
        this.userSeq.push(num);
        // this.startUserTimerWithReset();
        if(this.test(this.sequence, this.userSeq, this.counter)) {
            clearInterval(this.userWaitID);
            this.sim(this.counter++);
        }

    },

    startUserTimerWithReset() {
        if(this.userWaitID) {
            clearInterval(this.userWaitID);
            this.wait();
        } else {
            this.wait();
        }
    },

    x(i) {
        if(this.sequence[i] && this.counter > 0 && this.playing) {
            this.tone(i);
            this.counter--; // will stop the sim each round

            //this.wait();


            this.timeID = setTimeout(() => {
                this.sim(i+1);
            }, 1000);
        }
    },

    tone(i) {
        this['$audio' + this.sequence[i]].trigger('play');
        this.$board.find('#btn' + this.sequence[i]).trigger('mousedown');
    },

    sim(i) {
        this.sequence.push(this.random());
        this.x(i);

    },

    test(gameSeq, userSeq, index) {
        if(gameSeq[index] === userSeq[index]) {
            this.counter += 2;
            return true;
        }
        return false;

    },

    wait() {
        this.userWaitID = setTimeout(() => {
            console.log('wait');
            this.playing = false;
        }, 3000);

    }

};

$(document).ready(() => {


    game.init();
});