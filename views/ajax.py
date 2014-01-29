from web import app
from model import AirspaceFile
from flask import request

@app.route('/ajax/selection', methods=['GET','POST'])
def ajax_evaluate():
    return request.form['polygon'] 
    #afile = AirspaceFile.query.all()
    #return str(afile[0].serialize)

