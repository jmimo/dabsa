// Functional Library for DABSA to function
//
// Author: Michael Mimo Moratti

function initialize_google_map(map, htmlElementId, position, zoom) {
  map = new google.maps.Map(document.getElementById(htmlElementId), {
    center: position,
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });
}
