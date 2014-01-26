from web import app
from flask import request, render_template
from gmap import Map, Marker, Polygon, Circle, Polyline

from model import AirspaceFile, Airspace, Point
from openair import dms2dec
import gis

@app.route('/map', methods=['GET','POST'])
def map():
    if request.method == 'POST':
        amount = int(request.form['amount'])
        points = []
        formpoint = None
        counter = 0
        while counter < amount:
            formpoint = request.form['point_' + str(counter)]
            if(formpoint == None):
                break
            latlng = formpoint.split(":")
            points.append((latlng[0],latlng[1]))
            counter += 1

        airspaces = gis.find_all_airspaces_inside_selected_polygon(points=Point.query.all(),polypoints=points)

        googlemap = Map(center=Marker(dms2dec(46,48,4), dms2dec(8,13,36)), cls="google-map", zoom=9)
        construct_model(googlemap=googlemap,airspaces=airspaces)

        return render_template('map.html', navloc='map', gmap=googlemap)      

    return oldmap()

def construct_model(googlemap,airspaces):
    for airspace in airspaces:
        if len(airspace.points) > 2:
            polygon = Polygon(airspace=airspace)
            for point in airspace.points:
                polygon.add_marker(point.latitude_dec,point.longitude_dec)
            googlemap.add_polygon(polygon)
        elif len(airspace.points) == 2:
            polyline = Polyline(airspace=airspace)
            for point in airspace.points:
                polyline.add_marker(point.latitude_dec,point.longitude_dec)
            googlemap.add_polyline(polyline)

def oldmap():
    googlemap = Map(center=Marker(dms2dec(46,48,4), dms2dec(8,13,36)), cls="google-map", zoom=9)

    airspaceFile = AirspaceFile.query.filter(AirspaceFile.name.like('Flyland-WinPilot-29379.txt')).all()
    
    for airspace in airspaceFile[0].airspaces:
        if airspace.type == 'CLASS_D' and len(airspace.points) > 2:
            polygon = Polygon(airspace=airspace)
            for point in airspace.points:
                polygon.add_marker(point.latitude_dec,point.longitude_dec)
            googlemap.add_polygon(polygon)

    return render_template('map.html', navloc='map', gmap=googlemap)

