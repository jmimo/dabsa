// Functional Library for DABSA to function
//
// Author: Michael Mimo Moratti


var confirmWindow; 
var shapeControl;

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
  wildlife: {
    strokeColor: '#00CC00',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#00CC00',
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
  load_shape_control();
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

function load_shape_control() {
  $.get('/ajax/shapemenu', function(data) {
    shapeControl = data;
  });
}

function use_shape_control(name, description, datatype, shapeid) {
  if(shapeControl) {
    return shapeControl.replace('NAME',name).replace('DESCRIPTION',description).replace('DATATYPE',datatype).replace('SHAPEID',shapeid);
  } else {
    return 'n/a';
  }
}

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
      strokeColor: colorSheme['selection']['strokeColor'],
      strokeOpacity: colorSheme['selection']['strokeOpacity'],
      strokeWeight: colorSheme['selection']['strokeWeight'],
      fillColor: colorSheme['selection']['fillColor'],
      fillOpacity: colorSheme['selection']['fillOpacity']
    }  
  });
  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
    google.maps.event.addListener(polygon, 'rightclick', function(event) {
      store_shape('selection', 'current',polygon);
      confirmWindow.setPosition(event.latLng);
      confirmWindow.open(map);
      Ladda.bind('button.ladda-button');
    });
  });
}

function show_element(id) {
  $(id).removeClass('hide');
  $(id).show();
}

function hide_element(id) {
  $(id).hide();
}

function remove_selection() {
  var selection = remove_shape('selection', 'current');
  if(selection) {
    selection.setEditable(false);
    selection.setMap(null);
  }
  confirmWindow.close();
  reset_selection_button();  
  hide_element('#selection-show-hide-buttons-div');
}


function hide_current_selection() {
  var selection = retrieve_shape('selection', 'current');
  if(selection) {
    selection.setMap(null);
    show_element('#selection-show-hide-buttons-div');
  }
}

function show_current_selection() {
  var selection = retrieve_shape('selection', 'current');
  if(selection) {
    selection.setMap(map);
  }
}

function draw_airspaces_within_current_selection() {
  remove_all_shapes_from_map('airspace');
  load_and_draw_data_for_selection('airspace', retrieve_shape('selection', 'current'), null);
}

function draw_obstacles_within_current_selection() {
  var ladda_button = Ladda.create(document.querySelector('#button-load-obstacles'));
  ladda_button.start();
  remove_all_shapes_from_map('obstacle');
  load_and_draw_data_for_selection('obstacle', retrieve_shape('selection', 'current'), ladda_button);
}

function draw_wildlife_protection_within_current_selection() {
  var ladda_button = Ladda.create(document.querySelector('#button-load-wildlife'));
  ladda_button.start();
  remove_all_shapes_from_map('wildlife');
  load_and_draw_data_for_selection('wildlife', retrieve_shape('selection', 'current'), ladda_button);
}

function load_and_draw_data_callback(datatype, callbackdata) {
  if(datatype == 'airspace') {
    confirmWindow.close();
    hide_current_selection();
  }
  if(datatype == 'obstacle') {
     if(callbackdata) {
       callbackdata.stop();
     }
  } 
  if(datatype == 'wildlife') {
    if(callbackdata) {
      callbackdata.stop();
    }
  }
}

function load_and_draw_data_for_selection(datatype, selection, callbackdata) {
  var data = {};
  selection.getPath().forEach(function(latlng,i) {
    data['point_' + i] = latlng.lat() + ':' + latlng.lng();
  });
  data['size'] = selection.getPath().getLength();
  $.post('/ajax/selection/' + datatype, data, function(response) {
    var airspaces = JSON.parse(response);
    if(airspaces['airspaces'].length > 0) {
      show_element('#cleanup-airspaces');
    }
    $.each(airspaces['airspaces'], function(key, value) {
      var points = value['points'].length;
      if(points == 2) {
        draw_polyline(map, datatype, value);
      } else if(points > 2) {
        draw_polygon(map, datatype, value);
      }
    });
    load_and_draw_data_callback(datatype, callbackdata);
  });
}

var polygonConfirmWindow;
var currentPolygon;

function draw_polygon(map, datatype, polygon) {
  var selectedColorSheme = getPolygonColorSheme(polygon);
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
  store_shape(datatype, polygon['id'], polygon_def);
  google.maps.event.addListener(polygon_def, 'rightclick', function(event) {
    currentPolygon = polygon_def;
   polygonConfirmWindow = new google.maps.InfoWindow({
     content: use_shape_control(polygon['name'], polygon['description'], datatype, polygon['id'])
   });
   polygonConfirmWindow.setPosition(event.latLng);
   polygonConfirmWindow.open(map);
  });
}

function getPolygonColorSheme(polygon) {
  var selectedColorSheme = colorSheme['defaultSheme'];
  // TODO: implement all color shemes for polygons.
  if(polygon['type'] == 'CTR') {
    selectedColorSheme = colorSheme['ctr'];
  }
  if(polygon['subtype'] == 'WILDLIFE_PROTECTION') {
    selectedColorSheme = colorSheme['wildlife'];
  }
  return selectedColorSheme;
}

function remove_polygon(datatype, polygonid) {
  var shape = remove_shape(datatype,polygonid);
  if(shape) {
    shape.setMap(null);
  }
  if(polygonConfirmWindow) {
    polygonConfirmWindow.close();
  }
}

function draw_polyline(map, datatype, polyline) {
  var polyline_def = new google.maps.Polyline({
    path: create_coordinate_array(polyline),
    map: map 
  });
  polyline_def.set('type', 'polyline');
  polyline_def.set('identifier', polyline['id']);
  store_shape(datatype, polyline['id'], polyline_def);
}

function create_coordinate_array(drawingObject) {
  var coords = [];
  $.each(drawingObject['points'], function(index, point) {
    coords[index] = new google.maps.LatLng(point['latitude_dec'],point['longitude_dec']);
  });
  return coords;
}

function remove_all_shapes_from_map(qualifier) {
  var shapes = retrieve_all_shapes(qualifier);
  if (shapes != null) {
    $.each(shapes, function(key, value) {
      if(value) {
        value.setMap(null);
      }
    });
  }
}

// ###################################################
// Shape Storage
// ###################################################

var shapeStorage;

function initialize_shape_storage() {
  shapeStorage = {};
}

function store_shape(category, identifier, shape) {
  var cat = shapeStorage[category];
  if(!shapeStorage[category]) {
    shapeStorage[category] = {};
  }
  shapeStorage[category][identifier] = shape;
}

function retrieve_shape(category, identifier) {
  if(shapeStorage[category]) {
    return shapeStorage[category][identifier];
  } else {
    return null;
  }
}

function remove_shape(category, identifier) {
  if(shapeStorage[category]) {
    var shape = shapeStorage[category][identifier];
    shapeStorage[category][identifier] = null;
  return shape;
  } else {
    return null;
  }
}

function retrieve_all_shapes(category) {
  return shapeStorage[category];
}

function remove_all_shapes(category) {
  shapeStorage[category] = {};
}

// ################################################
// Static menu
// ################################################

function toggle_selection_button() {
  if($('#button-selection-hiding').data('togglestate') == 'show') {
    hide_current_selection();
    $('#button-selection-hiding').text('Show');
    $('#button-selection-hiding').data('togglestate','hide');
  } else if($('#button-selection-hiding').data('togglestate') == 'hide') {
    show_current_selection();
    $('#button-selection-hiding').text('Hide');
    $('#button-selection-hiding').data('togglestate','show');
  }
}

function reset_selection_button() {
  $('#button-selection-hiding').text('Show');
  $('#button-selection-hiding').data('togglestate','hide');
}
