$(document).ready(function () {
  // Get the modal
  var modal = document.getElementById('myModal');

  // When the user clicks on the button, open the modal
  $('#sttngs').click(function () {
    modal.style.display = 'block';
  });

  // When the user clicks on <span> (x), close the modal
  $('.close').click(function () {
    modal.style.display = 'none';
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // Collect inputs from settings form for global vars
  $('#save').click(function () {
    // Clear tgtTypes array
    let custScnr = [];
    // Collect values from checkbox list
    $('input:checkbox[name=scnTypes]:checked').each(function () {
      custScnr.push(JSON.parse($(this).val()));
    });
    // Get value from slider
    const tdVal = $('#myRange').val();
    const tdObject = { Name: 'createNoPlay(' + tdVal + ')' };
    custScnr.push(tdObject);

    const encoded = window.btoa(JSON.stringify(custScnr));

    const urlData = JSON.parse(window.atob(encoded));
    window.location = 'sim.html?data=' + encoded;
  });

  $('#myRange').change(function () {
    console.log($('#myRange').val());
    if ($('#myRange').val() == 1) $('#td-value').text('very quiet');
    if ($('#myRange').val() == 6) $('#td-value').text('quiet');
    if ($('#myRange').val() == 11) $('#td-value').text('moderate');
    if ($('#myRange').val() == 16) $('#td-value').text('busy');
    if ($('#myRange').val() == 21) $('#td-value').text('chaos');
  });
});
