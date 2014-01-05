from sqlalchemy import Table, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Area(Base):
    __tablename__ = 'area'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    type = Column(String)
    floor = Column(String)
    ceiling = Column(String)
    entries = relationship('entry')

class Entry(Base):
    __tabelname__ = 'entry'
    id = Column(Integer, primary_key=True)
    value = Column(String)
    index = Column(Integer)
    airspace_id = Column(Integer, ForeignKey('area.id'))
