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
    while counter < size:
        formpoint = request.form['point_' + str(counter)]
        if not formpoint:
            break
        latlng = formpoint.split(":")
        points.append((latlng[0],latlng[1]))
        counter += 1

    dbpoints = Point.query.all()
    #selected_airspaces = Airspace.query.all()
    
    airspaces = gis.find_all_airspaces_inside_selected_polygon(points=dbpoints,polypoints=points) 

    length = len(airspaces) - 1
    response = '{"airspaces":['
    response += ''.join([add_separator_if_necessary(length == index,airspace) for index, airspace in enumerate(airspaces)])
    response += ']}'
    return response.replace("u'",'"').replace("'", '"')

def add_separator_if_necessary(isLast, airspace):
    if isLast:
        return ('%s' % airspace.serialize)
    else:
        return ('%s,' % airspace.serialize)
