from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
from flask.ext.googlemaps import GoogleMaps, Map, Marker, Polygon

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

GoogleMaps(app)

app.config.update(dict(
    DEBUG=True
))

@app.route('/')
def welcome():
    return render_template('welcome.html', navloc='home')

@app.route('/import', methods=['GET', 'POST'])
def importAirspaces():
    if request.method == 'POST':
        file = request.files['file'] 
	processAirspaceFile(file)
	return render_template('welcome.html', navloc='home')
    if request.method == 'GET':
        return render_template('import.html', navloc='import')

@app.route('/map')
def map():
    googlemap = Map(center=Marker(dms2dec(46,59,48), dms2dec(8,22,58)), style='height:450px;width:800px;margin:0;')

    polygon1 = Polygon()
    polygon1.add_marker(dms2dec(46,57,13), dms2dec(8,27,52))
    polygon1.add_marker(dms2dec(46,57,46), dms2dec(8,30,41))
    polygon1.add_marker(dms2dec(46,57,55), dms2dec(8,28,40))
    polygon1.add_marker(dms2dec(46,58,28), dms2dec(8,27,56))
    polygon1.add_marker(dms2dec(46,57,13), dms2dec(8,27,52))
    googlemap.add_polygon(polygon1)
    
    polygon2 = Polygon()
    polygon2.add_marker(dms2dec(46,56,23),dms2dec(8,23,38))
    polygon2.add_marker(dms2dec(46,57,25),dms2dec(8,23,26))
    polygon2.add_marker(dms2dec(46,57,21),dms2dec(8,22,30))
    polygon2.add_marker(dms2dec(46,57,25),dms2dec(8,22,4))
    polygon2.add_marker(dms2dec(46,57,41),dms2dec(8,21,52))
    polygon2.add_marker(dms2dec(46,57,33),dms2dec(8,20,17))
    polygon2.add_marker(dms2dec(46,57,2),dms2dec(8,19,57))
    polygon2.add_marker(dms2dec(46,55,46),dms2dec(8,20,27))
    polygon2.add_marker(dms2dec(46,56,23),dms2dec(8,23,38))
    googlemap.add_polygon(polygon2)

    return render_template('map.html', navloc='map', gmap=googlemap)

def dms2dec(degrees, minutes, seconds):
    return int(degrees) + (float(minutes)/60) + (float(seconds)/3600)

if __name__ == '__main__':
    app.run()
