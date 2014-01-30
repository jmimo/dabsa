// Functional Library for DABSA to function
//
// Author: Michael Mimo Moratti

// TODO: create shape parameter settings container

function initialize_google_map(htmlElementId, position, mapType, zoom) {
  return new google.maps.Map(document.getElementById(htmlElementId), {
    center: position,
    zoom: zoom,
    mapTypeId: mapType
  });
}

function create_confirm_selection_dialog(processButtonFunctionName, removeButtonFunctionName) {
 return new google.maps.InfoWindow({
       content: '<div class="container-fluid"><b>Selection</b><br/><div class="btn-group btn-group-xs"><button class="btn btn-primary btn-success ladda-button" data-style="zoom-in" onclick="' + processButtonFunctionName  + '()"><span class="ladda-label">Submit</span><span class="ladda-spinner"></span></button><button class="btn btn-danger" onclick="' + removeButtonFunctionName + '()">Remove</button></div></div>'
      });
}

function load_drawing_manager(map, confirmWindow, currentSelectionFunctionName) {
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYGON]
    },
    polygonOptions: {
      draggable: true,
      editable: true,
      strokeColor: '#FF6600',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FFCC00',
      fillOpacity: 0.35
    }  
  });
  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
    google.maps.event.addListener(polygon, 'rightclick', function(event) {
      window[currentSelectionFunctionName](polygon);
      currentSelection = polygon;
      confirmWindow.setPosition(event.latLng);
      confirmWindow.open(map);
      Ladda.bind('button');
    });
  });
  }

function fetch_selection_data(map, currentSelection, url) {
  data = {};
  currentSelection.getPath().forEach(function(latlng,i) {
    data['point_' + i] = latlng.lat() + ':' + latlng.lng();
  });
  data['size'] = currentSelection.getPath().getLength();

  $.post(url, data, function(response) {
    confirmWindow.close();
    removeSelection();
    var airspaces = JSON.parse(response);
    $.each(airspaces['airspaces'], function(key, value) {
      var points = value['points'].length;
      if(points == 2) {
	 draw_polyline(map,value);
      } else if(points > 2) {
	 draw_polygon(map,value);
      }
    });
  });
}

function draw_polygon(map, polygon) {
  var polygon_def = new google.maps.Polygon({    
    paths: create_coordinate_array(polygon),
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillcolor: '#FF0000',
    fillopacity: 0.35
  });
  polygon_def.setMap(map);
}

function draw_polyline(map, polyline) {
  var polyline_def = new google.maps.Polyline({
    path: create_coordinate_array(polyline),
    map: map 
  });
}

function create_coordinate_array(drawingObject) {
  var coords = [];
  $.each(drawingObject['points'], function(index, point) {
    coords[index] = new google.maps.LatLng(point['latitude_dec'],point['longitude_dec']);
  });
  return coords;
}
