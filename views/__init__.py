from web import app
from database import db, shutdown_db
from flask import render_template

@app.teardown_appcontext
def shutdown_database(exception=None):
  shutdown_db() 

@app.route('/')
def welcome():
    return render_template('welcome.html', navloc='home')

import importview, mapview
