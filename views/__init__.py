from web import app
from database import db, shutdown_db
from flask import session, render_template
from model import AirspaceFile

@app.teardown_appcontext
def shutdown_database(exception=None):
  shutdown_db() 

import imp0rt
import m4p
import ajax
