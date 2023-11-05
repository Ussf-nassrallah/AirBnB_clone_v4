/**
Request http://0.0.0.0:5001/api/v1/status/:
If in the status is “OK”, add the class available to the div#api_status
Otherwise, remove the class available to the div#api_status
*/
const apiUrl = "http://127.0.0.1:5001/api/v1";

// filter amenities by checkbox input
$(document).ready(function () {
  // filter amenities by checkbox input
  const checkboxes = $(".checkboxe");
  let amenities = {};

  checkboxes.change(function () {
    if ($(this).is(":checked")) {
      amenities[$(this).attr("data-name")] = $(this).attr("data-id");
    } else {
      delete amenities[$(this).attr("data-name")];
    }
    let names = Object.keys(amenities);
    $(".amenities h4").text(names.sort().join(", "));
  });

  // filter cities by checkbox input
  const checkedCities = $(".checkboxc");
  let cities = {};

  checkedCities.change(function () {
    if ($(this).is(":checked")) {
      cities[$(this).attr("data-name")] = $(this).attr("data-id");
    } else {
      delete cities[$(this).attr("data-name")];
    }
    let names = Object.keys(cities);
    $(".locations h4").text(names.sort().join(", "));
  });

  // filter states by checkbox input
  const checkedStates = $(".checkboxs");
  let states = {};

  checkedStates.change(function () {
    if ($(this).is(":checked")) {
      states[$(this).attr("data-name")] = $(this).attr("data-id");
    } else {
      delete states[$(this).attr("data-name")];
    }
    let names = Object.keys(states);
    $(".locations h4").text(names.sort().join(", "));
  });

  apiStatus();
  fetchPlaces();

  // Search button
  $("button").click(function () {
    $("SECTION.places").empty();
    $.ajax({
      method: "POST",
      url: apiUrl + "/places_search/",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        amenities: Object.values(amenities),
        cities: Object.values(cities),
        states: Object.values(states),
      }),
      success: function (response) {
        // console.log('POST request successful', response);
        for (const place of response) {
          const article = [
            "<article>",
            '<div class="title_box">',
            `<h2>${place.name}</h2>`,
            `<div class="price_by_night">$${place.price_by_night}</div>`,
            "</div>",
            '<div class="information">',
            `<div class="max_guest">${place.max_guest} Guest(s)</div>`,
            `<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`,
            `<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>`,
            "</div>",
            '<div class="description">',
            `${place.description}`,
            "</div>",
            "</article>",
          ];
          $("SECTION.places").append(article.join(""));
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});

// know the API status
function apiStatus() {
  $.ajax({
    method: "GET",
    url: apiUrl + "/status",
    dataType: "json",
    success: function (response) {
      // console.log(response);
      if (response.status === "OK") {
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    },
  });
}

// Fetch places
function fetchPlaces() {
  $.ajax({
    method: "POST",
    url: apiUrl + "/places_search/",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({}),
    success: function (response) {
      // console.log('POST request successful', response);
      for (const place of response) {
        const article = [
          "<article>",
          '<div class="title_box">',
          `<h2>${place.name}</h2>`,
          `<div class="price_by_night">$${place.price_by_night}</div>`,
          "</div>",
          '<div class="information">',
          `<div class="max_guest">${place.max_guest} Guest(s)</div>`,
          `<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`,
          `<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>`,
          "</div>",
          '<div class="description">',
          `${place.description}`,
          "</div>",
          `<div class="reviews" data-place="${place.id}">`,
          "<h2></h2>",
          "<ul></ul>",
          "</div>",
          "</article>",
        ];
        $("SECTION.places").append(article.join(""));
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}
