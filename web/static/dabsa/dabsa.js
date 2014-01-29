// Functional Library for DABSA to function
//
// Author: Michael Mimo Moratti

function initialize_google_map(htmlElementId, position, zoom) {
  return new google.maps.Map(document.getElementById(htmlElementId), {
    center: position,
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });
}
