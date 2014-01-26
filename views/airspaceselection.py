from web import app
from database import db
from model import AirspaceFile
from flask import request, render_template
import openair

@app.route('/airspace/selection', methods=['GET', 'POST'])
def airspaceSelection():
    #if request.method == 'POST':

    return render_template('airspace-selection.html', navloc='import', files=AirspaceFile.query.all())
