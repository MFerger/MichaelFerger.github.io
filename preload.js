$(function() {
  $('#killed').hide();

  $('#play').on('click', function(event) {
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
    $('.killed').slideToggle('slow', function() {})
  });
// end
})
