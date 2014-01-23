from web import db

class Area(db.Model):
    __tablename__ = "Area"
    #__table_args__ = {"useexisting": True}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    floor = db.Column(db.String)
    ceiling = db.Column(db.String)
    entries = db.relationship('Entry', backref='area')
    
    def __repr__(self):
       return "[id:%s][name:%s][type:%s][floor:%s][ceiling:%s][entries:%s]" % (self.id,self.name,self.type,self.floor,self.ceiling,len(self.entries))

class Entry(db.Model):
    __tablename__ = "Entry"
    #__table_args__ = {"useexisting": True}
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String)
    index = db.Column(db.Integer)
    area_id = db.Column(db.Integer, db.ForeignKey('Area.id'))

    def __repr__(self):
       return "[id:%s][index:%s][value:%s]" % (self.id,self.index,self.value)
