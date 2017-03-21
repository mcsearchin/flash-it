describe('FlashIt', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base';
    jasmine.getFixtures().load('www/index.html');
  });

  it('exists', function() {
    expect(FlashIt).toBeDefined();
  });

  describe('on ready', function() {
    beforeEach(function() {
      FlashIt.ready();
    });

    describe('pressing the right button', function() {

      it('hides the answer div', function() {
        $('#right-button').click();

        var answer = $('.answer');
        expect(answer).toBeHidden();
      });

      it('updates the question image', function() {
        var previousImage = $('#question-image').attr('src');

        $('#right-button').click();

        var newImage = $('#question-image').attr('src');
        expect(newImage).toBeTruthy();
        expect(newImage).not.toEqual(previousImage);
      });
    });
  });
});
