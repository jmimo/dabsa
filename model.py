from database import Base
from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref

class User(Base):
    __tablename__ = "user"
    id = Column('id',Integer , primary_key=True)
    username = Column('username', String(256), unique=True , index=True)
    password = Column('password' , String(256))
    email = Column('email',String(256),unique=True , index=True)
    registered_on = Column('registered_on' , DateTime)

    def is_authenticated(self):
        return True
 
    def is_active(self):
        return True
 
    def is_anonymous(self):
        return False
 
    def get_id(self):
        return unicode(self.id)
 
    def __repr__(self):
        return '<User %r>' % (self.username)

class AirspaceFile(Base):
    __tablename__ = "AirspaceFile"
    id = Column(Integer, primary_key=True)
    name = Column(String(512))
    importDate = Column(DateTime)
    airspaces = relationship('Airspace', backref='file')

    def get_id(self):
        return id
    
    @property
    def serialize(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'importDate': (self.importDate.strftime("%Y-%n-%d %H:%M:%S") if self.importDate != None else None),
            'airspaces': [airspace.serialize for airspace in self.airspaces]
        }

class Airspace(Base):
    __tablename__ = "Airspace"
    id = Column(Integer, primary_key=True)
    description = Column(String(2048))
    name = Column(String(2048))
    type = Column(String(512))
    subtype = Column(String(512))
    floor = Column(String(128))
    ceiling = Column(String(128))
    file_id = Column(Integer, ForeignKey('AirspaceFile.id'))
    points = relationship('Point', backref='airspace')

    @property
    def serialize(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'description': self.description,
            'type': self.type,
            'subtype': (self.subtype if self.subtype != None else 'n/a'),
            'floor': self.floor,
            'ceiling': self.ceiling,
            'points': [point.serialize for point in self.points]
        }


class Point(Base):
    __tablename__ = "Point"
    id = Column(Integer, primary_key=True)
    index = Column(Integer)
    longitude = Column(String(512))
    longitude_dec = Column(Float)
    latitude = Column(String(512))
    latitude_dec = Column(Float)
    airspace_id = Column(Integer, ForeignKey('Airspace.id'))

    @property
    def serialize(self):
        return {
            'id': str(self.id),
            'index': str(self.index),
            'longitude': self.longitude,
            'longitude_dec': self.longitude_dec,
            'latitude': self.latitude,
            'latitude_dec': self.latitude_dec
        }



class Track(Base):
    __tablename__ = "Track"
    id = Column(Integer, primary_key=True)
    name = Column(String(512))
    auxiliary_name = Column(String(2048))
    description = Column(String(4096))
    pilot = Column(String(512))
    glider = Column(String(512))
    importDate = Column(DateTime)
    points = relationship('TrackPoint', backref='track') 

    @property
    def short_description(self):
        if self.description:
            if len(self.description) > 100:
                return ''.join([self.description[:100], '...'])
            return self.description
        return ''

    @property
    def serialize(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'pilot': self.pilot,
            'glider': self.glider,
            'trackDate': (self.importDate.strftime("%Y-%n-%d %H:%M:%S") if self.importDate != None else None),
            'trackpoints': [point.serialize for point in self.points]
        }


class TrackPoint(Base):
    __tablename__ = "TrackPoint"
    id = Column(Integer, primary_key=True)
    index = Column(Integer)    
    time = Column(DateTime)
    longitude = Column(Float)
    latitude = Column(Float)
    altitude_ps = Column(Integer)
    altitude_gps = Column(Integer)
    track_id = Column(Integer, ForeignKey('Track.id'))

    @property
    def serialize(self):
        return {
            'id': str(self.id),
            'index': str(self.index),
            'time': self.time.strftime("%H:%M:%S"),
            'longitude': self.longitude,
            'latitude': self.latitude,
            'altitude_ps': str(self.altitude_ps),
            'altitude_gps': str(self.altitude_gps)
        }
