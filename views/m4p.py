from baseview import BaseView
from web import app
from flask import request
from config import MAP_CENTER, MAP_TYPE, MAP_ZOOM

class MapView(BaseView):
    methods = ['GET']
    
    def get_template_name(self):
        return 'map.html'

    def dispatch_request(self):
        coords = MAP_CENTER.split(":")
        model = self.get_objects()
        model['home_coordinates'] = coords
        model['map_zoom'] = MAP_ZOOM
        model['map_type'] = MAP_TYPE
        return self.render_template(model)
   
app.add_url_rule('/', view_func=MapView.as_view('mapview'))
