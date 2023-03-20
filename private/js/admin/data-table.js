$(document).ready(function () {
  $('#myTable').DataTable();
  $('#myTable tbody').on('click', 'tr', function () {
    var href = $(this).data('href');
    if (href) {
      window.location = href;
    }
  });
});
