import argparse
import re
import datetime
from model import AirspaceFile, Airspace, Point

AIRSPACE_CLASSES = {
    'R':'RESTRICTED',
    'Q':'DANGER',
    'P':'PROHIBITED',
    'A':'CLASS_A',
    'B':'CLASS_B',
    'C':'CLASS_C',
    'D':'CLASS_D',
    'E':'CLASS_E',
    'GP':'GLIDER_PROHIBITED',
    'CTR':'CTR',
    'W':'WAVE_WINDOW',
    'FF':'FLYING_FIELD',
    'HP':'HELIPORT',
    'BB':'CABLECAR',
    'HI':'OBSTACLE',
    'GG':'LOCAL_DANGERZONE',
    'SZ':'WILDLIFE_PROTECTION',
    'VZ':'FLIGHT_PROHIBITED'
}

AIRSPACE_CLASSES_REF = dict((v,k) for k,v in AIRSPACE_CLASSES.iteritems())

def parse(filename,filepointer):
    rows = filepointer.readlines()
    airspaceFile = AirspaceFile(name=filename,importDate=datetime.datetime.now())
    counter = 0
    previousLine = ''
    for line in rows:
        identifier = line[:2]
        bareline = line[3:].replace('\r\n','')
        if(re.match("^[A-Za-z]",identifier)):
            if identifier == 'AC':
                airspace = Airspace(type=AIRSPACE_CLASSES[bareline],description=previousLine[14:].replace('\r\n',''))
                airspaceFile.airspaces.append(airspace)
                counter = 0
            elif identifier == 'AN':
                airspace.name = bareline
            elif identifier == 'AH':
                airspace.ceiling = bareline
            elif identifier == 'AL':
                airspace.floor = bareline
            elif identifier == 'DP':
               point = Point(index=counter)
               point.longitude = bareline[:8]
               point.latitude = bareline[11:20]
               airspace.points.append(point)
               counter += 1
        previousLine = line
            #else:
            #    entry = Entry(index=counter,value=line.replace('\r\n',''))
            #    area.entries.append(entry)
            #    counter += 1
    return airspaceFile
'''
def createHeader(date,types):
    output =  '*##############################################################################*\n'
    output += '*                                                                              *\n'
    output += '* DABS Optimized Switzerland Airspace                                          *\n'
    output += '* Including:                                                                   *\n'
    for type in types:
        output += '*  %s*\n' % (type.ljust(76))
    output += '*  And all DABS activated Airspaces as of: %s*\n' % (date.ljust(36))
    output += '*                                                                              *\n'
    output += '*##############################################################################*\n'
    return output

def marshal(areas):
    output = ''
    for area in areas:
        output += 'AC %s\nAN %s\nAL %s\nAH %s\n' % (area.type,area.name,area.floor,area.ceiling)
        for entry in sorted(area.entries,key=lambda sortentry: sortentry.index):
            output += '%s\n' % (entry.value)
        output += '*#############################################*\n'
    return output
'''
