from baseview import BaseView
from web import app
from flask import request
from config import MAP_CENTER
from gmap import Map, Polyline, Polygon, Marker
from model import Point
import gis

class MapView(BaseView):
    methods = ['GET', 'POST']
    
    def get_template_name(self):
        return 'map.html'

    def dispatch_request(self):
        map_center = MAP_CENTER.split(":")
        googlemap = Map(center=Marker(map_center[0],map_center[1]), cls="google-map", zoom=9)
        model = self.get_objects()
        if request.method == 'POST':
            self.display_airspaces_within_selection(googlemap)

        model['gmap'] = googlemap
        return self.render_template(model)
    
    def display_airspaces_within_selection(self,googlemap):
        amount = int(request.form['amount'])
        points = []
        formpoint = None
        counter = 0
        while counter < amount:
            formpoint = request.form['point_' + str(counter)]
            if not formpoint:
                break
            latlng = formpoint.split(":")
            points.append((latlng[0],latlng[1]))
            counter += 1
        # TODO only load the relevant points based on the initial airspace type selection.
        airspaces = gis.find_all_airpspaces_inside_selected_polygon(points=Point.query.all(),polypoints=points)
        construct_model(googlemap,airspaces)


    def construct_model(googlemap,airspaces):
        for airspace in airspaces:
            marker = []
            for point in airspace.points:
                marker.append(Marker(latitude=point.latitude_dec,longitude=point.longitude_dec))
            if len(marker) == 2:
                googlemap.add_polyline(Polyline(airspace=airspace, markers=marker))
            elif len(marker) > 2:
                googlemap.add_polygon(Polygon(airspace=airspace, markers=marker))


app.add_url_rule('/map', view_func=MapView.as_view('mapview'))
