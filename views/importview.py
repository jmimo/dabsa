from web import app
from database import db
from model import AirspaceFile
from flask import request, render_template
import openair

@app.route('/import', methods=['GET', 'POST'])
def importAirspaces():
    if request.method == 'POST':
        file = request.files['airspace'] 

        airspaceFile = openair.parse(file.filename,file)
        db.add(airspaceFile)
        db.commit()
        
    return render_template('import.html', navloc='import', files=AirspaceFile.query.all())
