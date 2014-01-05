from sqlalchemy import Table, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Airspace(Base):
    #__tablename__ = 'airspace'
    id = Column(Integer, primary_key=True, sqlite_autoincrement=True)
    name = Column(String)
    type = Column(String)
    floor = Column(String)
    ceiling = Column(String)
    points = relationship('Point')

class Terrain(Airspace):
    __tablename__ = 'terrain'
    topen = Column(String)
    tclosed = Column(String)
    pen = Column(String)
    brush = Column(String)
    

class 

class Point(Base):
    __tabelname__ = 'point'
    id = Column(Integer, primary_key=True, sqlite_autoincrement=True)
    xcoord = Column(String)
    ycoord = Column(String)
    airspace_id = Column(Integer, ForeignKey('airspace.id'))

