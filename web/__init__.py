from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.googlemaps import GoogleMaps

app = Flask(__name__)

app.config.from_object('config')

db = SQLAlchemy(app)

GoogleMaps(app)

from web import views
