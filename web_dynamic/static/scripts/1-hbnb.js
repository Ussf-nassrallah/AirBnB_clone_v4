$(document).ready(function () {
  $('input[type="checkbox"]').click(function () {
    const chekedAmenities = [];
    $('input[type="checkbox"]:checked').each(function () {
      chekedAmenities.push($(this).attr('data-name'));
    });
    if (chekedAmenities.length > 0) {
      $('.amenities h4').text(chekedAmenities.join(', '));
    }
  });
});
