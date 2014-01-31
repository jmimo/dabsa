from model import AirspaceFile, Airspace
from shapely.geometry import Polygon, Point
from numpy import array

def find_all_airspaces_inside_selected_polygon(points,polypoints):
    polygon = Polygon(array(polypoints))
    airspaces = []
    for point in points:
        spoint = Point(point.latitude_dec,point.longitude_dec)
        if(spoint.within(polygon)):
            airspaces.append(point.airspace)

    '''
    polygon = Polygon(array(polypoints))
    validated_airspaces = []
    for airspace in airspaces:
        for point in airspace.points:
            spoint = Point(point.latitude_dec,point.longitude_dec)
            if spoint.within(polygon):
                validated_airspaces.append(airspace)
                break
    
    for point in points:
        spoint = Point(point.latitude_dec,point.longitude_dec)
        if(spoint.within(polygon)):
            airspaces.append(point.airspace)
    '''

    return set(airspaces)    
