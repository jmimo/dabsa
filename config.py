import os

basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'dabsa.db')

MAX_CONTENT_LENGTH = 16 * 1024 * 1024
