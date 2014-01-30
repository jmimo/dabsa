import database
from model import AirspaceFile, Airspace
import time

def run_test():
    start_fetch = time.time()
    airspaces = query_data()
    print time.time() - start_fetch, "fetch"
    start_loop = time.time()
    response = loop_data(airspaces)
    print time.time() - start_loop, "loop"
    start_replace = time.time()
    result = replace_data(response)
    print time.time() - start_replace, "replace"
    #return result
    return 'Done'


def query_data():
    #airspace_file = AirspaceFile.query.all()
    #airspaces = airspace_file[0].airspaces
    #airspaces = [Airspace.query.get(53)]
    #airspaces = Airspace.query.all()
    airspaces = database.db.query(Airspace).filter(Airspace.name.like('B%')).all()
    print len(airspaces), "tuples are beeing processed"
    return airspaces

def loop_data(airspaces):
    length = len(airspaces) -1

    return '{"airspaces":['.join([add_separator_if_necessary(length == index,airspace) for index, airspace in enumerate(airspaces)]) + ']}'

def replace_data(response):
    return response.replace("u'",'"').replace("'", '"')

def add_separator_if_necessary(isLast, airspace):
    if isLast:
        return ('%s' % airspace.serialize)
    else:
        return ('%s,' % airspace.serialize)

if  __name__  == '__main__':
    print run_test()
