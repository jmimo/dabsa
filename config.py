import os

basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'dabsa.db')
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')

MAX_CONTENT_LENGTH = 16 * 1024 * 1024
