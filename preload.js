$(function() {
  $('#modalButton').hide();
  $('#newGame').hide();
    $('#killed').hide();
    $('#start').hide();
    $('#scores').hide();
    $('#blocker').hide();
  if (localStorage.name != undefined){
  var getName = localStorage.getItem('name');
  var samePerson = false;
  // if (samePerson == false){
  // } if (samePerson == true) {
  //   $('#killed').show();
  //   $('#start').show();
  // }
  $('#userName').text(getName);
}
  $('#play').on('click', function(event) {
    var namee = $('input[name=input]').val();
    console.log(namee);
    localStorage.setItem('name', namee);
    $('#userNameInput').removeClass('animated');
    if (namee.length === 0) {
      alert("Please type in your name.");
      $("#userNameInput").focus();
      event.preventDefault();
    } else {
      $('#scores').show();
      $('#scores').addClass('circle');
      // $('#testing').css({'display': 'none'});
      var value = $('input:text[name=input]').val();
      $('#userName').text(value)
      $('#userNameInput').val("");
      // $('#play').css('opacity', '0');
    }
  });
  $('#newGame').on('click', function(){
    start();
    resetButton();
    // trampoline.body = null;
    trampoline.destroy();
    game.state.start(game.state.current);
  })
  $('#scores').on('click', function() {
    $(this).removeClass('circle');
    $(this).text('Your scores');
    $(this).css('margin-left', '23%');
    startText.visible = true;
    $('#blocker').show();
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
//
  $('#reload').on('click', function(){
    location.reload();
  })
})
var seconds = 0,
  mili = 0,
  secondsElement = document.getElementById('seconds'),
  miliElement = document.getElementById('mili'),
  play = false;
stopwatch = setInterval(function() {
  if (!play) return;
  if (mili === 99) {
    seconds += 1;
    mili = 0;
  } else {
    mili += 1;
  }
  update();

}, 1);

function update() {

  secondsElement.innerText = ''+seconds+'s';
  miliElement.innerText = ''+mili+'ms';
}
function start() {
  if (!play) {
    seconds = 0, mili = 0;
    update();
  }
  play = !play;
}
