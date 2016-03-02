$(function() {
  $('#killed').hide();

  $('#play').on('click', function(event) {
    $('#scores').addClass('circle');
    if ($('input[name=input]').val().length === 0) {
      alert("Please type in your name.");
      $("#userNameInput").focus();
      event.preventDefault();
    } else {
      $('#testing').css({
        'display': 'none'
      });
      var value = $('input:text[name=input]').val();
      $('#userName').text(value)
      $('#userNameInput').val("");
    }
  });
  $('#scores').on('click', function() {
    $(this).removeClass('circle');
  })
  $('#first').on('click', function() {
      $('body').css('background', '#4C0359')
    })
    $('#second').on('click', function() {
      $('body').css('background', '#803201')
    })
    $('#third').on('click', function() {
      $('body').css('background', '#6E0200')
    })
    $('#fourth').on('click', function() {
        $('body').css('background', '#083645')
      })
  $('#scores').on('click', function() {
    $('.killed').slideToggle('slow', function() {})
  });
// end
})
