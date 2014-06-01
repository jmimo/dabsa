from baseview import BaseView
from web import app
from flask import request
from flask.ext.login import login_required
from database import db
from openair import parse
from igc import igcparse
from datetime import datetime
from model import AirspaceFile, Track
import dlog
from forms import FlightUploadForm

class FlightImportView(BaseView):
    methods = ['GET', 'POST']

    logger = dlog.get_logger('flight-import')

    def get_template_name(self):
        return 'flight_import.html'
    
    @login_required
    def dispatch_request(self):
        model = self.get_objects()
        form = FlightUploadForm(request=request, form=request.form)
        model['form'] = form
        if request.method == 'POST' and form.validate():
            track_file = request.files[form.file.name]
            if track_file == None or track_file.filename == None:
                form.file.errors.append('Please specify a valid file to be uploaded')
            else:
                track = None
                try:
                    track = igcparse(track_file.filename, track_file, datetime.now())
                    if form.name.data:
                        track.auxiliary_name = form.name.data
                    if form.description.data:
                        track.description = form.description.data
                    try:
                        db.add(track)
                        db.commit()
                    except Exception as e:
                        self.logger.error(e.message)
                        self.logger.info(e)
                        form.file.errors.append('Unable to store flight from file')
                except SyntaxError as e:
                    self.logger.error(e.message)
                    self.logger.info(e)
                    form.file.errors.append('Unable to validate file due to: %s' % e.message)

        model['tracks'] = Track.query.all()
        return self.render_template(model)


app.add_url_rule('/import/flight', view_func=FlightImportView.as_view('flightimportview'))
