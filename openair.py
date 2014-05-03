import argparse
import re
from model import AirspaceFile, Airspace, Point
import dlog

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
    'BC':'CABLE',
    'HI':'OBSTACLE',
    'GG':'LOCAL_DANGERZONE',
    'SZ':'WILDLIFE_PROTECTION',
    'VZ':'FLIGHT_PROHIBITED'
}

AIRSPACE_CLASSES_REF = dict((v,k) for k,v in AIRSPACE_CLASSES.iteritems())

logger = dlog.get_logger('openair-parser')

def parse(filename,filepointer, date):
    rows = filepointer.readlines()
    airspaceFile = AirspaceFile(name=filename, importDate=date)
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
                if bareline.startswith('BERGBAHN'):
                    airspace.subtype = 'CABLECAR'
                    airspace.name = bareline[9:]
                elif bareline.startswith('KABEL'):
                    airspace.subtype = 'CABLE'
                    airspace.name = bareline[6:]
                elif bareline.startswith('SCHUTZ'):
                    airspace.subtype = 'WILDLIFE_PROTECTION'
                    airspace.name = bareline[7:]
                else:
                    airspace.name = bareline
            elif identifier == 'AH':
                #airspace.ceiling = int(bareline.replace('GND', '0').replace('ft', '').strip())
                airspace.ceiling = bareline
            elif identifier == 'AL':
                #airspace.floor = int(bareline.replace('GND', '0').replace('ft', '').strip())
                airspace.floor = bareline
            elif identifier == 'DP':
               point = Point(index=counter)
               point.latitude = bareline[:8]
               point.latitude_dec = dms2dec(point.latitude[:2],point.latitude[3:5],point.latitude[6:])
               point.longitude = bareline[11:20]
               point.longitude_dec = dms2dec(point.longitude[:3],point.longitude[4:6],point.longitude[7:])
               airspace.points.append(point)
               counter += 1
        previousLine = line
    return airspaceFile

def dms2dec(degrees, minutes, seconds):
    return int(degrees) + (float(minutes)/60) + (float(seconds)/3600)
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
