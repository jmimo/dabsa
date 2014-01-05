from sqlalchemy import Table, MetaData, Column, ForeignKey, Integer, String
from sqlalchemy.orm import mapper

metadata = MetaData()

airpace = Table('airspace', metadata,
		Column('id', Integer, primary_key=True, sqlite_autoincrement=True),
		Column('name', String(255)),
		Column('type', String(10)),
		Column('low', String(20)),
		Column('high', String(20))
	)

point = Table('point', metadata,
		Column('id', Integer, primary_key=True, sqlite_autoincrement=True),
		Column('xcord', String(20)),
		Column('ycord', String(20)),
		Column('airspace_id', Integer, ForeignKey('airspace.id'))
	)


class Airspace(object):
    def __init__(self, name, type, low, high):
        self.name = name
        self.type = type
        self.low = low
        self.high = high


class Point(object):
    def __init__(self,xcord,ycord):
        self.xcord = xcord
        self.ycord = ycord

mapper(Airspace, airspace, properties={'points' : relationship(Point, backref='airspace', order_by=point.id})
mapper(Point,point)
