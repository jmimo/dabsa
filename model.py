from web import db
from sqlalchemy import Table, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, backref

class Area(db.Model):
    __tablename__ = 'area'
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String)
    type = db.Column(String)
    floor = db.Column(String)
    ceiling = db.Column(String)
    entries = db.relationship('Entry')
    
    def __init__(self,type):
        self.type = type

    def __repr__(self):
        return "[id:%s][name:%s][type:%s][floor:%s][ceiling:%s][entries:%s]" % (self.id,self.name,self.type,self.floor,self.ceiling,len(self.entries))

class Entry(db.Model):
    __tablename__ = 'entry'
    id = db.Column(Integer, primary_key=True)
    value = db.Column(String)
    index = db.Column(Integer)
    airspace_id = db.Column(Integer, ForeignKey('area.id'))

    def __init__(self,index,value):
        self.index = index
        self.value = value

    def __repr__(self):
        return "[id:%s][index:%s][value:%s]" % (self.id,self.index,self.value)
