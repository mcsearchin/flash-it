describe('app', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base';
    jasmine.getFixtures().load('www/index.html');
  });

  it('exists', function() {
    expect(app).toBeDefined();
  });

  describe('on document ready', function() {
    var previousQuestionImage;

    beforeEach(function() {
      app.onDocumentReady();
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
});


describe("acceleration listener", function() {
  var subject;
  var accelerometer;

  beforeEach(function() {
    accelerometer = jasmine.createSpyObj('accelerometer', ['watchAcceleration']);
    subject = app.accelerationListener(accelerometer);
  });

  it("exists", function() {
    expect(subject).toBeDefined();
  });

  it("watches acceleration at the expected frequency", function() {
    expect(accelerometer.watchAcceleration.calls.count()).toEqual(1);
    expect(accelerometer.watchAcceleration).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.any(Function),
      jasmine.objectContaining({ frequency: 500 }));
  });

  describe("flip down", function() {
    var accelerationSuccess;
    var flippedDown;

    beforeEach(function() {
      flippedDown = 0;
      subject.onFlipDown(function() { flippedDown += 1 });

      accelerationSuccess = accelerometer.watchAcceleration.calls.mostRecent().args[0];
      accelerationSuccess({ x: 0.0, y: 0.0, z: 0.0});
    });

    describe("when tilted down to the necessary threshold", function() {
        beforeEach(function() {
          accelerationSuccess({ x: 0.0, y: 0.0, z: 7.5});
        });

        describe("and back up to the necessary threshold", function() {
          beforeEach(function() {
            accelerationSuccess({ x: 0.0, y: 0.0, z: 2.5});
          });

          it("responds to the flip down event", function() {
            expect(flippedDown).toEqual(1);
          });
        });
    });
  })
});
