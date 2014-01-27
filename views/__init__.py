from web import app
from database import db, shutdown_db
from flask import session, render_template
from model import AirspaceFile

@app.teardown_appcontext
def shutdown_database(exception=None):
  shutdown_db() 

import index 
import imp0rt
import m4p

#@app.route('/')
#def welcome():
#    return render_template('welcome.html', navloc='home' files=get_all_files() selectedFile=get_selected_file())
'''
def get_all_files()
    return AirspaceFile.query.all()

def get_selected_file(request):
    return request.cookies.get('selectedfile')
    if 'selected.file' in session:
        return session['selected.file']
    return None

def set_selected_file(fileid):
    session['selected.file'] = fileid
'''

#import importview, mapview, selectionview
#import airspaceselection
