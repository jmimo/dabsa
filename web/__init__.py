from flask import Flask
from database import init_db
from gmap import GoogleMaps

init_db()

app = Flask(__name__)

app.config.from_object('config')

GoogleMaps(app)

import views
