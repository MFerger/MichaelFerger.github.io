$(function() {
  $('#killed').hide();
  $('#start').hide();
  $('#modalButton').hide();
  if (localStorage.name != undefined){
  var getName = localStorage.getItem('name');
  $('#userName').text(getName);
}
//   $('#heythere').on('click', function (event) {
//     alert();
//     // event.preventDefault();
// })
// $('#myModal').modal('toggle');
  $('#play').on('click', function(event) {
    var namee = $('input[name=input]').val();
    console.log(namee);
    localStorage.setItem('name', namee);
    if (namee.length === 0) {
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
