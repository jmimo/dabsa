import argparse
import re
import datetime
from model import AirspaceType, AirspaceFile, Airspace, Point

class AirspaceClass(object):
    # generic
    RESTRICTRED='R'
    DANGER='Q'
    PROHIBITED='P'
    CLASS_A='A'
    CLASS_B='B'
    CLASS_C='C'
    CLASS_D='D'
    GLIDER_PROHIBITED='GP'
    CTR='CTR'
    WAVE_WINDOW='W'
    # flyland.ch specific
    FLYING_FIELD='FF'
    HELIPORT='HP'
    CABLECAR='BB'
    OBSTACLE='HI'
    LOCAL_DANGERZONE='GG'
    WILDLIFE_PROTECTION='SZ'
    FLIGHT_PROHIBITED='VZ'

    def valueOf(classIdentifier):
        return {
            'R': RESTRICTED,
            'Q': DANGER,
            'P': PROHIBITED,
            'A': CLASS_A,
            'B': CLASS_B,
            'C': CLASS_C,
            'D': CLASS_D,
            'GP': GLIDER_PROHIBITED,
            'CTR': CTR,
            'W': WAVE_WINDOW,
            'FF': FLYING_FIELD,
            'HP': HELIPORT,
            'BB': CABLECAR,
            'HI': OBSTACLE,
            'GG': LOCAL_DANGERZONE,
            'SZ': WILDLIFE_PROTECTION,
            'VZ': FLIGHT_PROHIBITED
        }[classIdentifier]         
    
def parse(filename,filefilepointer):
    rows = filepointer.readlines()
    airspaceFile = AirspaceFile(name=filename,importDate=datetime.datetime.now())
    counter = 0
    for line in rows:
        identifier = line[:2]
        bareline = line[3:].replace('\r\n','')
        if(re.match("^[A-Za-z]",identifier)):
            if identifier == 'AC':
                airspace = Airspace(type=bareline)
                airspacefile.airspaces.append(area)
                counter = 0
            elif identifier == 'AN':
                area.name = bareline
            elif identifier == 'AH':
                area.ceiling = bareline
            elif identifier == 'AL':
                area.floor = bareline
            else:
                entry = Entry(index=counter,value=line.replace('\r\n',''))
                area.entries.append(entry)
                counter += 1
    return areas

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

