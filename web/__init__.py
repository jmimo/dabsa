from flask import Flask
from database import init_db
from gmap import GoogleMaps

init_db()

app = Flask(__name__)

app.secret_key = '#YWX\x8bQ\x19`SW\xbf\xf6i\xe0\x088\xfb\xb4|\xc1\xb7*9\xf0' 

app.config.from_object('config')

GoogleMaps(app)

import views
