from web import app
from model import AirspaceFile
from flask import request

@app.route('/ajax/selection', methods=['GET','POST'])
def ajax_evaluate():
    afile = AirspaceFile.query.all()
    return afile[0].to_JSON()

