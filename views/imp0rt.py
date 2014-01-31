from baseview import BaseView
from web import app
from flask import request
from database import db
from openair import parse
from model import AirspaceFile


class ImportView(BaseView):
    methods = ['GET', 'POST']

    def get_template_name(self):
        return 'import.html'
    
    def dispatch_request(self):
        if request.method == 'POST':
            importfile = request.files['airspace']
            if importfile:
                airspaceFile = parse(importfile.filename,importfile)
                db.add(airspaceFile)
                db.commit()

        model = self.get_objects()
        model['files'] = AirspaceFile.query.all()
        return self.render_template(model)


app.add_url_rule('/import', view_func=ImportView.as_view('importview'))
