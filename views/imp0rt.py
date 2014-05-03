from baseview import BaseView
from web import app
from flask import request
from database import db
from openair import parse
from igc import igcparse
from datetime import datetime
from model import AirspaceFile, Track
import dlog

class ImportView(BaseView):
    methods = ['GET', 'POST']

    def get_template_name(self):
        return 'import.html'
    
    def dispatch_request(self):

        logger = dlog.get_logger('imp0rt')

        if request.method == 'POST':
            airspace_file = request.files['airspace']
            if airspace_file:
                logger.info('parsing file')
                airspaceFile = parse(airspace_file.filename,airspace_file,datetime.now())
                logger.info('file parsed')
                try:
                    db.add(airspaceFile)
                    logger.info('added airspaces to database')
                    db.commit()
                    logger.info('commited data')
                except Exception as e:
                    logger.error(e.message)
                    logger.info(e)
                    raise
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
        model['files'] = AirspaceFile.query.all()
        model['tracks'] = Track.query.all()
        return self.render_template(model)


app.add_url_rule('/import', view_func=ImportView.as_view('importview'))
