import os
import logging

basedir = os.path.abspath(os.path.dirname(__file__))

LOGFILE= os.path.join(basedir, 'dabsa.log')
LOGLEVEL=logging.DEBUG

GOOGLEMAPS_KEY='AIzaSyCPQfNI1ipRDjfadDfDZXnj6JyMsXQLqW4'
MAP_CENTER='46.801111111111105:8.226666666666667'
MAP_TYPE='google.maps.MapTypeId.SATELLITE'
MAP_ZOOM=8

#SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'dabsa.db')
SQLALCHEMY_DATABASE_URI = 'mysql://dabsa:darkstar45@localhost/dabsa?charset=utf8&use_unicode=0'
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')

MAX_CONTENT_LENGTH = 16 * 1024 * 1024
