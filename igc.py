import re
from datetime import datetime
from model import Track, TrackPoint


def igcparse(filename,filepointer,date):
    rows = filepointer.readlines()
    counter = 0;
    track = Track(name=filename, importDate=date)
    for line in rows:
        identifier = line[:1]
        if(identifier == 'H'):
            if(line[:5] == 'HFDTE'):
                track.date = datetime.strptime(line[5:11], '%d%m%y')
            if(line[:10] == 'HFPLTPILOT'): 
                track.pilot = line[11:]
            if(line[:15] == 'HFGTYGLIDERTYPE'):
                track.glider = line[16:]
        if(identifier == 'B'):
            point = TrackPoint(index=counter)
            counter += 1
            point.time = datetime.combine(track.date.date(), datetime.strptime(line[1:7], '%H%M%S').time())
            point.latitude = dms2dec(line[7:9],line[9:11],line[11:14])
            point.longitude = dms2dec(line[15:18],line[18:20],line[20:23])
            point.altitude_ps = line[25:30]
            point.altitude_gps = line[30:35]
            track.points.append(point)
    return track
            


def dms2dec(degrees, minutes, seconds):
    return int(degrees) + (float(minutes)/60) + (float(seconds)/3600)
