import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the app (async)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it(`should have as title 'app' (async)`, async(() => {
        // Arrange

        // Act
        const compiled = fixture.debugElement.nativeElement;

        // Assert
        expect(compiled.querySelector('h1').textContent).toContain('Simon');
    }));

    it(`should have initial params (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.isGame).toEqual(false);
    }));

    describe('#initGame', () => {
        it(`should init game with initial params (async)`, async(() => {
            // Arrange

            // Act
            component.initGame();

            // Assert
            expect(component.currentState).toEqual('--');
            expect(component.state).toEqual(0);
            expect(component.stepsArr).toEqual([]);
            expect(component.counter).toEqual(0);
            expect(component.mode).toEqual(0);
            expect(component.userSteps).toEqual(0);
            expect(component.passed).toEqual(0);
            expect(component.nextAttempt).toEqual(false);
            expect(component.displayState).toEqual(0);
        }));
    });

    describe('#activate', () => {
        it(`should change state according to activate(1) (async)`, async(() => {
            // Arrange

            // Act
            component.activate(1);

            // Assert
            expect(component.state).toEqual(1);
        }));
    });

    describe('#deactivate', () => {
        it(`should reset state to 0 after method deactivate() (async)`, async(() => {
            // Arrange

            // Act
            component.deactivate();

            // Assert
            expect(component.state).toEqual(0);
        }));
    });

    describe('#toggleGameState', () => {
        it(`should change 'isGame' to opposite value after method toggleGameState() (async)`, async(() => {
            // Arrange
            component.isGame = false;

            // Act
            component.toggleGameState();

            // Assert
            expect(component.isGame).toEqual(true);
            expect(component.displayState).toEqual(1);
        }));

        it(`should call method 'init' if 'isGame' is true after method toggleGameState() (async)`, async(() => {
            // Arrange
            component.isGame = true;

            // Act
            component.toggleGameState();

            // Assert
            expect(component.isGame).toEqual(false);
            expect(component.currentState).toEqual('--');
            expect(component.state).toEqual(0);
            expect(component.stepsArr).toEqual([]);
            expect(component.counter).toEqual(0);
            expect(component.mode).toEqual(0);
            expect(component.userSteps).toEqual(0);
            expect(component.passed).toEqual(0);
            expect(component.nextAttempt).toEqual(false);
            expect(component.displayState).toEqual(0);
        }));
    });

    describe('#toggleStrictMode', () => {
        it(`should change 'strictMode' to opposite value after method toggleStrictMode() (async)`, async(() => {
            // Arrange
            component.strictMode = false;

            // Act
            component.toggleStrictMode();

            // Assert
            expect(component.strictMode).toEqual(true);
        }));
    });

    describe('#changeGameState', () => {
        it(`should not do anything if 'isGame' is false (async)`, async(() => {
            // Arrange
            component.isGame = false;
            component.state = 1;

            // Act
            component.changeGameState();

            // Assert
            expect(component.state).toEqual(1);
        }));

        it(`should call 'initGame' method if 'isGame' is true (async)`, async(() => {
            // Arrange
            component.isGame = true;
            component.state = 1;

            // Act
            spyOn(component, 'initGame');
            component.changeGameState();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.initGame).toHaveBeenCalled();
            });
        }));
    });

    describe('#playSound', () => {
        it(`should change 'audio.src' according to given param in method (async)`, async(() => {
            // Arrange

            // Act
            component.playSound(1);

            // Assert
            expect(component.audio.src).toEqual('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
        }));
    });

    describe('#timeout', () => {
        it(`should not do anything with data if 'stepsArr.length >= 20' (async)`, async(() => {
            // Arrange
            component.stepsArr = [ 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4 ];

            // Act
            component.timeout();

            // Assert
            expect(component.stepsArr.length).toEqual(20);
        }));
    });

    describe('#updateMode', () => {
        it(`should set 'mode' to 1 (async)`, async(() => {
            // Arrange
            component.mode = 0;

            // Act
            component.updateMode();

            // Assert
            expect(component.mode).toEqual(1);
        }));

        it(`should change 'nextAttempt' to opposite value if 'nextAttempt' is true (async)`, async(() => {
            // Arrange
            component.mode = 0;
            component.nextAttempt = true;

            // Act
            component.updateMode();

            // Assert
            expect(component.mode).toEqual(1);
            expect(component.nextAttempt).toEqual(false);
        }));

        it(`should increment 'passed' if 'nextAttempt' is false (async)`, async(() => {
            // Arrange
            component.mode = 0;
            component.nextAttempt = false;
            component.passed = 1;

            // Act
            component.updateMode();

            // Assert
            expect(component.mode).toEqual(1);
            expect(component.nextAttempt).toEqual(false);
            expect(component.passed).toEqual(2);
        }));

        it(`should change 'currentState' to value '02' if 'nextAttempt' is false and 'passed' is 1 (async)`, async(() => {
            // Arrange
            component.mode = 0;
            component.nextAttempt = false;
            component.passed = 1;

            // Act
            component.updateMode();

            // Assert
            expect(component.mode).toEqual(1);
            expect(component.nextAttempt).toEqual(false);
            expect(component.passed).toEqual(2);
            expect(component.currentState).toEqual('02');
        }));
    });

    describe('#userMouseDown', () => {
        it(`should call 'activate' method if 'mode' is 1 and 'isGame' is true (async)`, async(() => {
            // Arrange
            component.isGame = true;
            component.mode = 1;

            // Act
            spyOn(component, 'activate');
            component.userMouseDown(1);

            // Assert
            fixture.whenStable().then(() => {
                expect(component.activate).toHaveBeenCalled();
            });
        }));
    });

    describe('#userMouseDownPwr', () => {
        it(`should change 'pwrState' to true (async)`, async(() => {
            // Arrange
            component.pwrState = false;

            // Act
            component.userMouseDownPwr(true);

            // Assert
            expect(component.pwrState).toEqual(true);
        }));
    });

    describe('#userMouseUp', () => {
        it(`should call 'deactivate' method if 'mode' is 1 and 'isGame' is true (async)`, async(() => {
            // Arrange
            component.isGame = true;
            component.mode = 1;

            // Act
            spyOn(component, 'deactivate');
            component.userMouseUp(1);

            // Assert
            fixture.whenStable().then(() => {
                expect(component.deactivate).toHaveBeenCalled();
            });
        }));
    });

    describe('#resetCurrentGameStep', () => {
        it(`should change 'userSteps', 'nextAttempt', 'currentState' (async)`, async(() => {
            // Arrange
            component.userSteps = 10;
            component.nextAttempt = false;
            component.passed = 5;
            component.currentState = '00';

            // Act
            component.resetCurrentGameStep();

            // Assert
            expect(component.userSteps).toEqual(0);
            expect(component.nextAttempt).toEqual(true);
            expect(component.currentState).toEqual('05');
        }));

        it(`should call 'timeout' method (async)`, async(() => {
            // Arrange

            // Act
            spyOn(component, 'timeout');
            component.resetCurrentGameStep();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.timeout).toHaveBeenCalled();
            });
        }));
    });
});
