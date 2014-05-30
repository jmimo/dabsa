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

class ImportView(BaseView):
    methods = ['GET', 'POST']

    def get_template_name(self):
        return 'flight_import.html'
    
    @login_required
    def dispatch_request(self):

        logger = dlog.get_logger('imp0rt')

        if request.method == 'POST':
            track_file = request.files['track']
            if track_file:
                logger.info('importing track')
                track = igcparse(track_file.filename,track_file,datetime.now())
                logger.debug('parsed igc file: %s' % track_file.filename)
                try:
                    db.add(track)
                    db.commit()
                except Exception as e:
                    logger.error(e.message)
                    logger.info(e)
                    raise

        model = self.get_objects()
        model['tracks'] = Track.query.all()
        return self.render_template(model)


app.add_url_rule('/import/flight', view_func=ImportView.as_view('flightimportview'))
