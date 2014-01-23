from web import db

class AirspaceFile(db.Model):
    __tablename__ = "AirspaceFile"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    importDate = db.Column(db.DateTime)
    airspaces = db.relationship('Airspace', backref='file')

    def __repr__(self):
        return "[id:%s][name:%s][importDate:%s][airspaces:%s]" & (self.id,self.name,self.importDate,len(self.airspaces))

class Airspace(db.Model):
    __tablename__ = "Airspace"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    floor = db.Column(db.String)
    ceiling = db.Column(db.String)
    file_id = db.Column(db.Integer, db.ForeignKey('AirspaceFile.id'))
    points = db.relationship('Point', backref='airspace')
    
    def __repr__(self):
       return "[id:%s][name:%s][type:%s][floor:%s][ceiling:%s][entries:%s]" % (self.id,self.name,self.type,self.floor,self.ceiling,len(self.entries))

class Point(db.Model):
    __tablename__ = "Point"
    id = db.Column(db.Integer, primary_key=True)
    prefix = db.Column(db.String)
    longitude = db.Column(db.String)
    latitude = db.Column(db.String)
    index = db.Column(db.Integer)
    airspace_id = db.Column(db.Integer, db.ForeignKey('Airspace.id'))

    def __repr__(self):
       return "[id:%s][index:%s][prefix:%s][longitude:%s][latitude:%s]" % (self.id,self.index,self.prefix,self.longitude,self.latitude)
