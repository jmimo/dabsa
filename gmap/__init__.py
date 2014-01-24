from flask import render_template, Blueprint, Markup
from model import Airspace

class Map(object):

    def __init__(self, center, markers=None, polygons=None, circles=None, lines=None, zoom=13, maptype="SATELLITE", varname='map', div="mymap", cls="map"):
        self.center = center or Marker('47.12505','8.61546')
        self.markers = markers or []
        self.polygons = polygons or []
        self.circles = circles or []
        self.lines = lines or []
        self.zoom = zoom
        self.maptype = maptype
        self.varname = varname
        self.div = div
        self.cls = cls

    def add_marker(self, latitude, longitude):
        self.markers.append(Marker(latitude,longitude))

    def add_polygon(self, polygon):
        self.polygons.append(polygon)

    def add_circle(self, circle):
        self.circles.append(circle)

    def add_line(self, polyline):
        self.lines.append(polyline)

    def render(self, *args, **kwargs):
        return render_template(*args, **kwargs)

    @property
    def js(self):
        return Markup(self.render('googlemaps/gmapjs.html', gmap=self))

    @property
    def html(self):
        return Markup(self.render('googlemaps/gmap.html', gmap=self))


def googlemap_obj(*args, **kwargs):
    map = Map(*args, **kwargs)
    return map


def googlemap(*args, **kwargs):
    map = googlemap_obj(*args, **kwargs)
    return Markup("".join((map.js, map.html)))


def googlemap_html(*args, **kwargs):
    return googlemap_obj(*args, **kwargs).html


def googlemap_js(*args, **kwargs):
    return googlemap_obj(*args, **kwargs).js


class GoogleMaps(object):
    def __init__(self, app=None, **kwargs):
        self.key = kwargs.get('key')
        if app:
            self.init_app(app)

    def init_app(self, app):
        app.config['GOOGLEMAPS_KEY'] = self.key
        self.register_blueprint(app)
        app.add_template_filter(googlemap_html)
        app.add_template_filter(googlemap_js)
        app.add_template_global(googlemap_obj)
        app.add_template_filter(googlemap)
        app.add_template_global(googlemap)

    def register_blueprint(self, app):
        module = Blueprint("googlemaps", __name__,
                           template_folder="templates")
        app.register_blueprint(module)
        return module

class Drawing(object):
    def __init__(self, airspace):
        self.airspace = airspace

class Marker(object):
    def __init__(self, latitude, longitude):
        self.latitude = latitude
        self.longitude = longitude

class Polygon(Drawing):
    def __init__(self, airspace=None, markers=None, strokecolor="#FF0000", strokeopacity=0.8, strokeweight=2, fillcolor="#FF0000", fillopacity=0.35):
        Drawing.__init__(self,airspace)
        self.markers = markers or []
        self.strokecolor = strokecolor
        self.strokeopacity = strokeopacity
        self.strokeweight = strokeweight
        self.fillcolor = fillcolor
        self.fillopacity = fillopacity

    def add_marker(self, latitude, longitude):
        self.markers.append(Marker(latitude, longitude))

class Circle(Drawing):
    def __init__(self, center, radius, airspace=None, strokecolor="#FF0000", strokeopacity=0.8, strokeweight=2, fillcolor="#FF0000", fillopacity=0.35):
        Drawing.__init__(self,airspace)
        self.center = center
        self.radius = radius
        self.strokecolor = strokecolor
        self.strokeopacity = strokeopacity
        self.strokeweight = strokeweight
        self.fillcolor = fillcolor
        self.fillopacity = fillopacity

class Polyline(Drawing):
    def __init__(self, markers=None, airspace=None):
        Drawing.__init__(self,airspace)
        self.markers = markers or []
