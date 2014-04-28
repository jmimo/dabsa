import config

config.SQLALCHEMY_DATABASE_URI = config.SQLITE_URI

from web import app

app.run(debug=True)
