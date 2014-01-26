from baseview import BaseView
from web import app
from flask import request
from database import db
from openair import parse


class ImportView(BaseView):
    methods = ['GET', 'POST']

    def get_template_name(self):
        return 'import.html'
    
    def get_navloc(self):
        return 'import'

    def dispatch_request(self):
        if request.method == 'POST':
            importfile = request.files['airspace']
            if importfile:
                airspaceFile = parse(importfile.filename,importfile)
                db.add(airspaceFile)
                db.commit()
        return BaseView.dispatch_request(self) 


app.add_url_rule('/import', view_func=ImportView.as_view('importview'))
