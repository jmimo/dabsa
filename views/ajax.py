from web import app
from model import Point
from flask import request
import gis

@app.route('/ajax/selection', methods=['POST'])
def ajax_evaluate():
    size = int(request.form['size'])
    points = []
    formpoint = None
    counter = 0
    while counter < size:
        formpoint = request.form['point_' + str(counter)]
        if not formpoint:
            break
        latlng = formpoint.split(":")
        points.append((latlng[0],latlng[1]))
        counter += 1

    airspaces = gis.find_all_airspaces_inside_selected_polygon(points=Point.query.all(),polypoints=points) 
    response = '{['
    for airspace in airspaces:
        response += str(airspace.serialize)
    response += ']}'
    return response
