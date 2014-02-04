from web import app
from database import db
import shapely.geometry
from numpy import array
from model import Airspace, Point
from flask import request, render_template

@app.route('/ajax/selectionmenu', methods=['GET'])
def ajax_selection_menu():
    return render_template('selection_menu.html')

@app.route('/ajax/staticmenu', methods=['GET'])
def ajax_static_menu():
    return render_template('static_menu.html')

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

    #dbpoints = Point.query.all()
    #selected_airspaces = Airspace.query.all()


    query = db.query(Point).join(Point.airspace).filter(Airspace.subtype == None)
    dbpoints = query.all()

    airspaces = find_all_airspaces_inside_selected_polygon(dbpoints,points)

    length = len(airspaces) - 1
    response = '{"airspaces":['
    response += ''.join([add_separator_if_necessary(length == index,airspace) for index, airspace in enumerate(airspaces)])
    response += ']}'
    return response.replace("u'",'"').replace("'", '"')

def find_all_airspaces_inside_selected_polygon(points,polypoints):
    polygon = shapely.geometry.Polygon(array(polypoints))
    airspaces = []
    for point in points:
        spoint = shapely.geometry.Point(point.latitude_dec,point.longitude_dec)
        if(spoint.within(polygon)):
            airspaces.append(point.airspace)
    return airspaces

def add_separator_if_necessary(isLast, airspace):
    if isLast:
        return ('%s' % airspace.serialize)
    else:
        return ('%s,' % airspace.serialize)
