from baseview import BaseView
from web import app
from flask import request
from config import MAP_CENTER
from gmap import Map, Polyline, Polygon, Marker
from model import Point
import gis

class MapView(BaseView):
    methods = ['GET']
    
    def get_template_name(self):
        return 'map.html'

    def dispatch_request(self):
        return self.render_template(self.get_objects())
   
app.add_url_rule('/map', view_func=MapView.as_view('mapview'))
