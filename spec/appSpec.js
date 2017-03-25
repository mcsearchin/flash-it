describe('app', function() {
  var subject = flashIt.app();
  var accelerationListener;
  var previousQuestionImage;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base';
    jasmine.getFixtures().load('www/index.html');

    accelerationListener = jasmine.createSpyObj('accelerationListener', ['init', 'onFlipDown']);
    subject = flashIt.app(accelerationListener);
  });

  it('exists', function() {
    expect(subject).toBeDefined();
  });

  describe('on document ready', function() {
    beforeEach(function() {
      subject.onDocumentReady();
      previousQuestionImage = $('#question-image').attr('src');
    });

    describe('pressing the right button', function() {
      beforeEach(function() {
        $('#right-button').click();
      });

      it('hides the answer div', function() {
        var answer = $('.answer');
        expect(answer).toBeHidden();
      });

      it('updates the question image', function() {
        var newQuestionImage = $('#question-image').attr('src');
        expect(newQuestionImage).toBeTruthy();
        expect(newQuestionImage).not.toEqual(previousQuestionImage);
      });
    });

    describe('pressing the wrong button', function() {
      beforeEach(function() {
        $('#wrong-button').click();
      });

      it('hides the answer div', function() {
        var answer = $('.answer');
        expect(answer).toBeHidden();
      });

      it('updates the question image', function() {
        var newQuestionImage = $('#question-image').attr('src');
        expect(newQuestionImage).toBeTruthy();
        expect(newQuestionImage).not.toEqual(previousQuestionImage);
      });
    });
  });

  describe('on device ready', function() {
    beforeEach(function() {
      subject.onDeviceReady();
    });

    it('initializes the acceleration listener', function() {
      expect(accelerationListener.init.calls.count()).toEqual(1);
    });

    it('sets up a flip down event', function() {
      expect(accelerationListener.onFlipDown.calls.count()).toEqual(1);
    });

    describe('on flip down', function() {
      var flipDown;
      var answer;

      beforeEach(function() {
        flipDown = accelerationListener.onFlipDown.calls.mostRecent().args[0];
      });

      describe('when the answer is displayed', function() {
        beforeEach(function() {
          answer = $('.answer');
          answer.show();

          flipDown();
        });

        it('hides the answer div', function() {
          expect(answer).toBeHidden();
        });

        it('updates the question image', function() {
          var newQuestionImage = $('#question-image').attr('src');
          expect(newQuestionImage).toBeTruthy();
          expect(newQuestionImage).not.toEqual(previousQuestionImage);
        });
      });

      describe('when the answer is hidden', function() {
        beforeEach(function() {
          answer = $('.answer');
          answer.hide();

          flipDown();
        });

        it('shows the answer div', function() {
          expect($('.answer')).toBeVisible();
        });
      })
    })
  });
});


describe('acceleration listener', function() {
  var subject;

  beforeEach(function() {
    subject = flashIt.accelerationListener();
  });

  it('exists', function() {
    expect(subject).toBeDefined();
  });

  describe("init", function() {
    var accelerometer;

    beforeEach(function() {
      accelerometer = jasmine.createSpyObj('accelerometer', ['watchAcceleration']);
      subject.init(accelerometer);
    });

    it('watches acceleration at the expected frequency', function() {
      expect(accelerometer.watchAcceleration.calls.count()).toEqual(1);
      expect(accelerometer.watchAcceleration).toHaveBeenCalledWith(
        jasmine.any(Function),
        jasmine.any(Function),
        jasmine.objectContaining({ frequency: 250 }));
    });

    describe('flip down', function() {
      var accelerationSuccess;
      var flippedDown;

      beforeEach(function() {
        flippedDown = 0;
        subject.onFlipDown(function() { flippedDown += 1 });

        accelerationSuccess = accelerometer.watchAcceleration.calls.mostRecent().args[0];
        accelerationSuccess({ x: 0.0, y: 0.0, z: 0.0});
      });

      describe('when tilted down to the necessary threshold', function() {
        beforeEach(function() {
          accelerationSuccess({ x: 0.0, y: 0.0, z: subject.DOWN_Z_THRESHOLD});
        });

        describe('and tilted back up to the necessary threshold', function() {
          beforeEach(function() {
            accelerationSuccess({ x: 0.0, y: 0.0, z: subject.DOWN_RETURN_Z_THRESHOLD});
          });

          it('responds to the flip down event', function() {
            expect(flippedDown).toEqual(1);
          });

          describe('and tilted back down and up past the necessary thresholds', function() {
            beforeEach(function() {
              accelerationSuccess({ x: 0.0, y: 0.0, z: subject.DOWN_Z_THRESHOLD - 0.01});
              accelerationSuccess({ x: 0.0, y: 0.0, z: subject.DOWN_RETURN_Z_THRESHOLD + 0.01});
            });

            it('responds to the flip down event', function() {
              expect(flippedDown).toEqual(2);
            });
          });
        });

        describe('and tilted back up just shy of the necessary threshold', function() {
          beforeEach(function() {
            accelerationSuccess({ x: 0.0, y: 0.0, z: subject.DOWN_RETURN_Z_THRESHOLD - 0.01});
          });

          it('does not respond to the flip down event', function() {
            expect(flippedDown).toEqual(0);
          });
        });
      });

      describe('when tilted down just shy of the necessary threshold', function() {
        beforeEach(function() {
          accelerationSuccess({ x: 0.0, y: 0.0, z: subject.DOWN_Z_THRESHOLD + 0.01});
        });

        describe('and tilted back up to the necessary threshold', function() {
          beforeEach(function() {
            accelerationSuccess({ x: 0.0, y: 0.0, z: subject.DOWN_RETURN_Z_THRESHOLD});
          });

          it('responds to the flip down event', function() {
            expect(flippedDown).toEqual(0);
          });
        });
      });
    })
  });
});
