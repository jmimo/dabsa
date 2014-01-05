from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
from sqlalchemy import create_engine, event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

dbengine = create_engine('sqlite://///Users/mimo/Development/dabs/dabs.db')

@event.listener_for(Engine, 'connect')
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute('PRAGMA foreign_keys=ON')
    cursor.close()

app.config.update(dict(
    DEBUG=True
))

@app.route('/')
def welcome():
    return render_template('welcome.html', navloc='home')

@app.route('/import', methods=['GET', 'POST'])
def importAirspaces():
    if request.method == 'POST':
        file = request.files['file'] 
	processAirspaceFile(file)
	return render_template('welcome.html', navloc='home')
    if request.method == 'GET':
        return render_template('import.html', navloc='import')


def processAirspaceFile(airspaceFile):
    Session = sessionmaker(bind=dbengine)
    session = Session()
    while True:
        line = airpsaceFile.readline()
        identifier = line[:2]
        switch(identifier) {
                case AC:
        if not line:
            break

if __name__ == '__main__':
    app.run()
