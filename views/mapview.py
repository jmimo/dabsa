from web import app
from flask import request, render_template
from gmap import Map, Marker, Polygon, Circle

from model import AirspaceFile, Airspace, Point

@app.route('/map')
def map():
    googlemap = Map(center=Marker(dms2dec(46,48,4), dms2dec(8,13,36)), cls="google-map", zoom=9)

    #googlemap.add_marker(dms2dec(46,48,4), dms2dec(8,13,36))

    airspaceFile = AirspaceFile.query.filter(AirspaceFile.name.like('Flyland-WinPilot-29379.txt')).all()
    
    for airspace in airspaceFile[0].airspaces:
        if airspace.type == 'CLASS_D' and len(airspace.points) > 2:
            polygon = Polygon(airspace=airspace)
            for point in airspace.points:
                polygon.add_marker(dms2dec(point.longitude[:2],point.longitude[3:5],point.longitude[6:]),dms2dec(point.latitude[:3],point.latitude[4:6],point.latitude[7:]))
            googlemap.add_polygon(polygon)

    return render_template('map.html', navloc='map', gmap=googlemap)

def dms2dec(degrees, minutes, seconds):
    return int(degrees) + (float(minutes)/60) + (float(seconds)/3600)
