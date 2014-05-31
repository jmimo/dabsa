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

class AirspaceImportView(BaseView):
    methods = ['GET', 'POST']

    logger = dlog.get_logger('airspace-import')

    def get_template_name(self):
        return 'airspace_import.html'
    
    @login_required
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

        model = self.get_objects()
        model['files'] = AirspaceFile.query.all()
        return self.render_template(model)


app.add_url_rule('/import/airspace', view_func=AirspaceImportView.as_view('airspaceimportview'))
