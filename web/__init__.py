from flask import Flask
from database import init_db
from gmap import GoogleMaps
from flask.ext.login import LoginManager
from model import User

init_db()

app = Flask(__name__)

app.secret_key = '#YWX\x8bQ\x19`SW\xbf\xf6i\xe0\x088\xfb\xb4|\xc1\xb7*9\xf0' 

app.config.from_object('config')

GoogleMaps(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'loginview'

@login_manager.user_loader
def load_user(userid):
    return User.query.get(userid)

import views
