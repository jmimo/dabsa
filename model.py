from database import Base
from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from collections import defaultdict
from json import dumps

class AirspaceFile(Base):
    __tablename__ = "AirspaceFile"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    importDate = Column(DateTime)
    airspaces = relationship('Airspace', backref='file')

    def get_id(self):
        return id
    
    def to_JSON(self):
        values = defaultdict(list)
        values['id'] = self.id
        values['name'] = self.name
        values['import_date'] = str(self.importDate)
        for index, airspace in enumerate(self.airspaces):
            values['airspaces'].append(airspace.to_JSON())
        return dumps(values)

    def __repr__(self):
        return self.to_JSON()

class Airspace(Base):
    __tablename__ = "Airspace"
    id = Column(Integer, primary_key=True)
    description = Column(String)
    name = Column(String)
    type = Column(String)
    floor = Column(String)
    ceiling = Column(String)
    file_id = Column(Integer, ForeignKey('AirspaceFile.id'))
    points = relationship('Point', backref='airspace')

    def to_JSON(self):
        values = defaultdict(list)
        values['id'] = self.id
        values['name'] = self.name
        values['description'] = self.description
        values['type'] = self.type
        values['floor'] = self.floor
        values['ceiling'] = self.ceiling
        for index, point in enumerate(self.points):
            values['points'].append(point.to_JSON())
        return dumps(values)
    
    def __repr__(self):
        return self.to_JSON()

class Point(Base):
    __tablename__ = "Point"
    id = Column(Integer, primary_key=True)
    longitude = Column(String)
    longitude_dec = Column(Float)
    latitude = Column(String)
    latitude_dec = Column(Float)
    index = Column(Integer)
    airspace_id = Column(Integer, ForeignKey('Airspace.id'))

    def to_JSON(self):
        values = defaultdict(list)
        values['id'] = self.id
        values['index'] = self.index
        values['latitude'] = self.latitude
        values['latitude_dec'] = self.latitude_dec
        values['longitude'] = self.longitude
        values['longitude_dec'] = self.longitude_dec
        return dumps(values)

    def __repr__(self):
        return self.to_JSON()
