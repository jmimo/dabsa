// Functional Library for DABSA to function
//
// Author: Michael Mimo Moratti

// TODO: create shape parameter settings container

var currentSelection;
var confirmWindow; 

// color sheme

var colorSheme = {
  defaultSheme: {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  },
  selection: {
    strokeColor: '#FF6600',
    stokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF6600',
    fillOpacity: 0.35
  },
  restricted: {
    strokeColor: '#FF6600',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF6600',
    fillOpacity: 0.35
  },
  danger: {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  },
  ctr: {
    strokeColor: '#3300FF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#3300FF',
    fillOpacity: 0.35
  }
};

function initialize_google_map(htmlElementId, position, mapType, zoom) {
  initialize_shape_storage();
  var mapOptions = {
    zoom: zoom,
    center: position,
    mapTypeId: mapType,
    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    zoomControl: true
  }
  var map = new google.maps.Map(document.getElementById(htmlElementId), mapOptions);
  confirmWindow = new google.maps.InfoWindow();
  load_confirm_selection_dialog();
  load_drawing_manager(map);
  load_selection_control(map);
  return map;
}

function load_confirm_selection_dialog() {
 $.get('/ajax/selectionmenu', function(data) {
  confirmWindow.setContent(data);
 });
}

function load_selection_control(map) {
  $.get('/ajax/staticmenu', function(data) {
    var rootDiv = document.createElement('div');
    rootDiv.innerHTML = data;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(rootDiv);
  }); 
}

/*
function load_shape_context_dialog(shapeName, shapeDescription) {
  var result;
  $.ajax({
    url: '/ajax/shapemenu?name=' + shapeName + '&description=' shapeDescription,
    success function(data) {
      result = data;
    },
    async: false
  });
  return result;
} 
*/

function load_drawing_manager(map) {
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
      strokeColor: colorSheme['strokeColor'],
      strokeOpacity: colorSheme['strokeOpacity'],
      strokeWeight: colorSheme['strokeWeight'],
      fillColor: colorSheme['fillColor'],
      fillOpacity: colorSheme['fillOpacity']
    }  
  });
  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
    google.maps.event.addListener(polygon, 'rightclick', function(event) {
      currentSelection = polygon;
      confirmWindow.setPosition(event.latLng);
      confirmWindow.open(map);
      Ladda.bind('button');
    });
  });
}

function remove_selection() {
  if(currentSelection) {
    currentSelection.setEditable(false);
    currentSelection.setMap(null);
    currentSelection = null;
  }
  confirmWindow.close();
}

function fetch_selection_data() {
  // TODO: offer choice whether the current dispalyed shapes are to be removed.
  remove_all_shapes_from_map();
  data = {};
  currentSelection.getPath().forEach(function(latlng,i) {
    data['point_' + i] = latlng.lat() + ':' + latlng.lng();
  });
  data['size'] = currentSelection.getPath().getLength();

  $.post('/ajax/selection', data, function(response) {
    confirmWindow.close();
    remove_selection();
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
  var selectedColorSheme = colorSheme['defaultSheme'];
  if(polygon['type'] == 'CTR') {
    selectedColorSheme = colorSheme['ctr'];
  }
  var polygon_def = new google.maps.Polygon({    
    paths: create_coordinate_array(polygon),
    strokeColor: selectedColorSheme['strokeColor'],
    strokeOpacity: selectedColorSheme['strokeOpacity'],
    strokeWeight: selectedColorSheme['strokeWeigth'],
    fillColor: selectedColorSheme['fillColor'],
    fillOpacity: selectedColorSheme['fillOpacity']
  });
  polygon_def.set('type', 'polygon');
  polygon_def.set('identifier', polygon['id']);
  polygon_def.setMap(map);
  store_shape(polygon['id'], polygon_def);
  google.maps.event.addListener(polygon_def, 'rightclick', function(event) {
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
