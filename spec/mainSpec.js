describe('FlashIt', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base';
    jasmine.getFixtures().load('www/index.html');
  });

  it('exists', function() {
    expect(FlashIt).toBeDefined();
  });

  describe('on ready', function() {
    var previousQuestionImage;

    beforeEach(function() {
      FlashIt.ready();
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
