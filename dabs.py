from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
from sqlalchemy import create_engine

app = Flask(__name__)
dbengine = create_engine('sqlite://///Users/mimo/Development/dabs/dabs.db')

app.config.update(dict(
    DEBUG=True
))

@app.route('/')
def welcome():
    return render_template('welcome.html', navloc='home')

if __name__ == '__main__':
    app.run()
