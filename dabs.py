from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
from flask.ext.googlemaps import GoogleMaps, Map
import re

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
    polygon = Map(identifier='polygon', lat=dms2dec(46,59,48), lng=dms2dec(8,22,58), style='height:450px;width:800px;margin:0;',
            drawingtype='polygon', markers=[(dms2dec(46,57,13), dms2dec(8,27,52)), (dms2dec(46,57,46), dms2dec(8,30,41)),
                (dms2dec(46,57,55), dms2dec(8,28,40)), (dms2dec(46,58,28), dms2dec(8,27,56)), (dms2dec(46,57,13), dms2dec(8,27,52))],
    )
    return render_template('map.html', navloc='map', gmap=polygon)

def dms2dec(degrees, minutes, seconds):
    return int(degrees) + (float(minutes)/60) + (float(seconds)/3600)

if __name__ == '__main__':
    app.run()
