import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentState: string;
    state: number;
    pwrState: boolean;
    isGame = false;
    strictMode: boolean;
    stepsArr: Array<number>;
    audiosArr: Array<string>;
    interval;
    intervalSound;
    counter: number;
    mode: number;
    userSteps: number;
    passed: number;
    nextAttempt: boolean;
    displayState: number;
    audio;

    constructor() {
        this.audio = new Audio();
        this.audiosArr = [`https://s3.amazonaws.com/freecodecamp/simonSound1.mp3`,
        `https://s3.amazonaws.com/freecodecamp/simonSound2.mp3`,
        `https://s3.amazonaws.com/freecodecamp/simonSound3.mp3`,
        `https://s3.amazonaws.com/freecodecamp/simonSound4.mp3`];
        this.initGame();
    }

    initGame() {
        this.currentState = '--';
        this.state = 0;
        this.stepsArr = [];
        // this.stepsArr = [1, 2, 3, 4];
        // this.stepsArr = [ 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4 ];
        this.counter = 0;
        this.mode = 0;    // TODO: Do not forget to change it back to 0
        this.userSteps = 0;
        this.passed = 0;
        this.nextAttempt = false;
        this.displayState = 0;
    }

    activate(btnNum: number) {
        this.state = btnNum;
    }

    deactivate() {
        this.state = 0;
    }

    toggleGameState() {
        this.isGame = !this.isGame;
        this.displayState = this.isGame ? 1 : 0;

        if (!this.isGame) {
            this.initGame();
        }
    }

    toggleStrictMode() {
        this.strictMode = !this.strictMode;
    }

    changeGameState() {
        if (this.isGame) {
            this.initGame();

            setTimeout(() => { this.displayState = 0; }, 200);
            setTimeout(() => { this.displayState = 1; }, 300);
            setTimeout(() => { this.displayState = 0; }, 600);
            setTimeout(() => { this.displayState = 1; }, 900);

            setTimeout(() => {
                this.currentState = '00';
                this.displayState = this.isGame ? 1 : 0;
                this.timeout();
            }, 1500);
        }
    }

    playSound(num: number) {
        this.audio.src = this.audiosArr[num - 1] !== '' ? this.audiosArr[num - 1] : this.audiosArr[0];
        this.audio.load();
        this.audio.play();
    }

    timeout() {

        // If steps more than 20 -> win
        if (this.stepsArr.length >= 20) {
            alert('You won the game');
            return;
            // restart the game
        }

        this.interval = setInterval(() => {

            this.deactivate();

            const tmpStep = this.stepsArr[this.counter];

            setTimeout(() => { this.activate(tmpStep); }, 500);
            setTimeout(() => { this.playSound(tmpStep); }, 500);
            this.counter++;

            if (this.stepsArr.length === this.counter || this.stepsArr.length === 0) {
                clearInterval(this.interval);
                setTimeout(() => { this.deactivate(); }, 1000);

                if (this.nextAttempt) {
                    setTimeout(() => { this.updateMode(); }, 1000);
                } else {
                    // Generate new number from 1 to 4
                    const tmpNumRnd = Math.floor(Math.random() * (4) + 1);

                    // Add new number to array
                    this.stepsArr.push(tmpNumRnd);
                    setTimeout(() => { this.activate(tmpNumRnd); }, 1500);
                    setTimeout(() => { this.playSound(tmpNumRnd); }, 1500);
                    setTimeout(() => { this.deactivate(); }, 2000);
                    setTimeout(() => { this.updateMode(); }, 2000);
                }
                this.counter = 0;
                this.userSteps = 0;
            }
        }, 1000);
    }

    updateMode() {
        this.mode = 1;
        if (this.nextAttempt) {
            this.nextAttempt = false;
        } else {
            this.passed++;
        }
        this.currentState = ('0' + this.passed).slice(-2);
    }

    userMouseDown(num: number) {
        if (this.mode === 1 && this.isGame) {
            this.activate(num);
        }
    }

    userMouseDownPwr(state: boolean) {
        this.pwrState = state;
    }

    userMouseUp(num: number) {
        if (this.mode === 1 && this.isGame) {
            this.deactivate();

            if (this.stepsArr[this.userSteps] === num) {
                this.userSteps++;

                if (this.userSteps === this.stepsArr.length) {
                    this.mode = 0;
                    this.timeout();
                }
            } else {
                this.mode = 0;
                this.currentState = '!!';

                setTimeout(() => { this.displayState = 0; }, 300);
                setTimeout(() => { this.displayState = 1; }, 600);
                setTimeout(() => { this.displayState = 0; }, 900);
                setTimeout(() => { this.displayState = 1; }, 1200);
                setTimeout(() => { this.displayState = 0; }, 1500);
                setTimeout(() => { this.displayState = 1; }, 1800);

                // Reset strict or not)
                if (this.strictMode) {
                    setTimeout(() => { this.changeGameState(); }, 3000);
                } else {
                    setTimeout(() => { this.resetCurrentGameStep(); }, 3000);
                }
            }
            this.playSound(num);
        }
    }

    resetCurrentGameStep() {
        this.userSteps = 0;
        this.nextAttempt = true;
        this.currentState = ('0' + this.passed).slice(-2);
        this.timeout();
    }
}
