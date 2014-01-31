from database import Base
from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref

class AirspaceFile(Base):
    __tablename__ = "AirspaceFile"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    importDate = Column(DateTime)
    airspaces = relationship('Airspace', backref='file')

    def get_id(self):
        return id
    
    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'importDate': (self.importDate.strftime("%Y-%n-%d %H:%M:%S") if self.importDate != None else None),
            'airspaces': [airspace.serialize for airspace in self.airspaces]
        }

class Airspace(Base):
    __tablename__ = "Airspace"
    id = Column(Integer, primary_key=True)
    description = Column(String)
    name = Column(String)
    type = Column(String)
    subtype = Column(String)
    floor = Column(String)
    ceiling = Column(String)
    file_id = Column(Integer, ForeignKey('AirspaceFile.id'))
    points = relationship('Point', backref='airspace')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'type': self.type,
            'floor': self.floor,
            'ceiling': self.ceiling,
            'points': [point.serialize for point in self.points]
        }


class Point(Base):
    __tablename__ = "Point"
    id = Column(Integer, primary_key=True)
    index = Column(Integer)
    longitude = Column(String)
    longitude_dec = Column(Float)
    latitude = Column(String)
    latitude_dec = Column(Float)
    airspace_id = Column(Integer, ForeignKey('Airspace.id'))

    @property
    def serialize(self):
        return {
            'id': self.id,
            'index': self.index,
            'longitude': self.longitude,
            'longitude_dec': self.longitude_dec,
            'latitude': self.latitude,
            'latitude_dec': self.latitude_dec
        }

