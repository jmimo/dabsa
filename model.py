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
    entries = relationship('Entry')
    
    def __init__(self,type):
        self.type = type

    def __repr__(self):
        return "[id:%s][name:%s][type:%s][floor:%s][ceiling:%s][entries:%s]" % (self.id,self.name,self.type,self.floor,self.ceiling,len(self.entries))

class Entry(Base):
    __tablename__ = 'entry'
    id = Column(Integer, primary_key=True)
    value = Column(String)
    index = Column(Integer)
    airspace_id = Column(Integer, ForeignKey('area.id'))

    def __init__(self,index,value):
        self.index = index
        self.value = value

    def __repr__(self):
        return "[id:%s][index:%s][value:%s]" % (self.id,self.index,self.value)
