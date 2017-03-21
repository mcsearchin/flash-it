var FlashIt = {};

FlashIt.ready = function() {
  $('#right-button').click(function() {
    $('.answer').hide();
    $('#question-image').attr('src', 'img/music_notes/Treble-D.png')
  });
}

$(document).ready(FlashIt.ready);
