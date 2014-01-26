from web import app
from flask import request, render_template
from gmap import Map, Marker

@app.route('/selection')
def selection():
    googlemap = Map(center=Marker(dms2dec(46,48,4), dms2dec(8,13,36)), cls="google-map", zoom=9)

    return render_template('selection.html', navloc='selection', gmap=googlemap)

def dms2dec(degrees, minutes, seconds):
    return int(degrees) + (float(minutes)/60) + (float(seconds)/3600)
