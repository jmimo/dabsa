from database import Base
from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref

class AirspaceFile(Base):
    __tablename__ = "AirspaceFile"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    importDate = Column(DateTime)
    airspaces = relationship('Airspace', backref='file')

    def __repr__(self):
        return "[id:%s][name:%s][importDate:%s][airspaces:%s]" & (self.id,self.name,self.importDate,len(self.airspaces))

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
    
    def __repr__(self):
       return "[id:%s][name:%s][type:%s][floor:%s][ceiling:%s][entries:%s]" % (self.id,self.name,self.type,self.floor,self.ceiling,len(self.entries))

class Point(Base):
    __tablename__ = "Point"
    id = Column(Integer, primary_key=True)
    prefix = Column(String)
    longitude = Column(String)
    longitude_dec = Column(Float)
    latitude = Column(String)
    latitude_dec = Column(Float)
    index = Column(Integer)
    airspace_id = Column(Integer, ForeignKey('Airspace.id'))

    def __repr__(self):
       return "[id:%s][index:%s][prefix:%s][longitude:%s][latitude:%s]" % (self.id,self.index,self.prefix,self.longitude,self.latitude)
