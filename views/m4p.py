from baseview import BaseView
from web import app
from flask import request
from config import MAP_CENTER

class MapView(BaseView):
    methods = ['GET']
    
    def get_template_name(self):
        return 'map.html'

    def dispatch_request(self):
        return self.render_template(self.get_objects())
   
app.add_url_rule('/', view_func=MapView.as_view('mapview'))
