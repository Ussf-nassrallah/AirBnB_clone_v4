/**
Request http://0.0.0.0:5001/api/v1/status/:
If in the status is “OK”, add the class available to the div#api_status
Otherwise, remove the class available to the div#api_status
*/

// filter amenities by checkbox input
$(document).ready(function () {
  const apiUrl = 'http://127.0.0.1:5001/api/v1/status/'
  const checkboxes = $('.checkboxe');
  let amenities = {};

  checkboxes.change(function () {
    if ($(this).is(":checked")) {
      amenities[$(this).attr('data-name')] = $(this).attr('data-id');
    } else {
      delete amenities[$(this).attr('data-name')];
    }
    let names = Object.keys(amenities);
    $('.amenities h4').text(names.sort().join(', '));
  });

  $.ajax({
    method: "GET",
    url: apiUrl,
    dataType: "json",
    success: function (response) {
      // console.log(response);
      if (response.status === 'OK') {
        $("#api_status").addClass('available');
      } else {
        $("#api_status").removeClass('available');
      };
    }
  });
});