from web import app, db
from model import AirspaceFile
from flask import request, render_template
import openair

@app.route('/import', methods=['GET', 'POST'])
def importAirspaces():
    if request.method == 'POST':
        file = request.files['airspace'] 

        airspaceFile = openair.parse(file.filename,file)
        db.session.add(airspaceFile)
        db.session.commit()
        
    return render_template('import.html', navloc='import', files=AirspaceFile.query.all())
