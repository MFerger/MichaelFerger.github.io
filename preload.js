$(function() {
  $('#killed').hide();
  $('#start').hide();
  $('#modalButton').hide();
//   $('#heythere').on('click', function (event) {
//     alert();
//     // event.preventDefault();
// })
// $('#myModal').modal('toggle');
  $('#play').on('click', function(event) {
    if ($('input[name=input]').val().length === 0) {
      alert("Please type in your name.");
      $("#userNameInput").focus();
      event.preventDefault();
    } else {
      $('#scores').addClass('circle');
      $('#testing').css({'display': 'none'});
      var value = $('input:text[name=input]').val();
      $('#userName').text(value)
      $('#userNameInput').val("");
      // $('#play').css('opacity', '0');
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
  $('#reload').on('click', function(){
    location.reload();
  })
})
var s = 0,
  ms = 0,
  sEl = document.getElementById('s'),
  msEl = document.getElementById('ms'),
  play = false;
stopwatch = setInterval(function() {
  if (!play) return;
  if (ms === 99) {
    s += 1;
    ms = 0;
  } else {
    ms += 1;
  }
  update();

}, 1);

function update() {

  sEl.innerText = ''+s+'s';
  msEl.innerText = ''+ms+'ms';
}
function stopIt(){
  // $('#s').val() = 0;
  // $('#ms').val() = 0;
}
function start() {
  if (!play) {
    s = 0, ms = 0;
    update();
  }
  play = !play;
}
