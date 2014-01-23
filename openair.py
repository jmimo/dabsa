import argparse
import re
import datetime
from model import AirspaceType, AirspaceFile, Airspace, Point

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

