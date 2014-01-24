from web import app
from flask import render_template

@app.route('/')
def welcome():
    return render_template('welcome.html', navloc='home')

import importview, mapview
