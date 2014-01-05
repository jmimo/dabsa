import argparse
import re
from model import Area, Entry

def parse(file):
    pointer = open(file,'r')
    rows = pointer.readlines()
    areas = []
    for line in rows:
        identifier = line[:2]
        bareline = line[3:].replace('\r\n','')
        if(re.match("^[A-Za-z]",identifier)):
            if identifier == 'AC':
                area = Area()
                area.type = bareline
                areas.append(area)
            elif identifier == 'AN':
                area.name = bareline
            elif identifier == 'AH':
                area.ceiling = bareline
            elif identifier == 'AL':
                area.floor = bareline
            else:
                entry = Entry()
                entry.value = line
                area.entries.append(entry)
    return areas
