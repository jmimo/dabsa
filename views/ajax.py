from web import app
from model import Point
from flask import request
import gis
import time

@app.route('/ajax/selection', methods=['POST'])
def ajax_evaluate():
    size = int(request.form['size'])
    points = []
    formpoint = None
    counter = 0
    start_form_read_time = time.time()
    while counter < size:
        formpoint = request.form['point_' + str(counter)]
        if not formpoint:
            break
        latlng = formpoint.split(":")
        points.append((latlng[0],latlng[1]))
        counter += 1

    print time.time() - start_form_read_time, "seconds for form reading"

    start_fetch_from_db = time.time()
    dbpoints = Point.query.all()
    print time.time() - start_fetch_from_db, "seconds for db readout"

    start_within_polygon = time.time()   

    airspaces = gis.find_all_airspaces_inside_selected_polygon(points=dbpoints,polypoints=points) 

    print time.time() - start_within_polygon, "seconds for within polygon algorithm"

    start_serialization = time.time()

    response = '{"airspaces":['
    length = len(airspaces) - 1
    for index, airspace in enumerate(airspaces):
        response += ('%s' % airspace.serialize)
	if index < length:
	    response += ','
    response += ']}'
    response = response.replace("'",'"').replace('u"', '"')
    print time.time() - start_serialization, "seconds for serialization of data to json format"

    return response
