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
  // TODO: store current selection polygon in shape storage for further use.
  remove_all_shapes_from_map();
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

var polygonConfirmWindow;
var currentPolygon;

function draw_polygon(map, polygon) {
  var polygon_def = new google.maps.Polygon({    
    paths: create_coordinate_array(polygon),
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillcolor: '#FF0000',
    fillopacity: 0.35
  });
  polygon_def.set('type', 'polygon');
  polygon_def.set('identifier', polygon['id']);
  polygon_def.setMap(map);
  store_shape(polygon['id'], polygon_def);
  google.maps.event.addListener(polygon_def, 'click', function(event) {
    currentPolygon = polygon_def;
   polygonConfirmWindow = new google.maps.InfoWindow({
     content: '<div class="container-fluid"><b>' + polygon['name']  + '</b><br/><em>' + polygon['description'] + '</em><div class="btn-group btn-group-xs"><button class="btn btn-danger" onclick="remove_polygon()">Remove</button></div></div>'
   });
   polygonConfirmWindow.setPosition(event.latLng);
   polygonConfirmWindow.open(map);
  });
}

function remove_polygon() {
  if(currentPolygon) {
    currentPolygon.setMap(null);
    remove_shape(currentPolygon.get('identifier'));
  }
  if(polygonConfirmWindow) {
    polygonConfirmWindow.close();
  }
}

function draw_polyline(map, polyline) {
  var polyline_def = new google.maps.Polyline({
    path: create_coordinate_array(polyline),
    map: map 
  });
  polyline_def.set('type', 'polyline');
  polyline_def.set('identifier', polyline['id']);
  store_shape(polyline['id'], polyline-def);
}

function create_coordinate_array(drawingObject) {
  var coords = [];
  $.each(drawingObject['points'], function(index, point) {
    coords[index] = new google.maps.LatLng(point['latitude_dec'],point['longitude_dec']);
  });
  return coords;
}

function remove_all_shapes_from_map() {
  var shapes = retrieve_all_shapes();
  if (shapes != null) {
    $.each(shapes, function(key, value) {
      if(value) {
        value.setMap(null);
      }
    });
  }
  remove_all_shapes();
}

// ###################################################
// Shape Storage
// ###################################################

var shapeStorage;

function initialize_shape_storage() {
  shapeStorage = {};
}

function store_shape(identifier, shape) {
  shapeStorage[identifier] = shape;
}

function retrieve_shape(identifier) {
  return shapeStorage[identifier];
}

function remove_shape(identifier) {
  var shape = shapeStorage[identifier];
  shapeStorage[identifier] = null;
  return shape;
}

function retrieve_all_shapes() {
  return shapeStorage;
}

function remove_all_shapes() {
  initialize_shape_storage();
}
