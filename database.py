import config
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

dbengine = create_engine(config.SQLALCHEMY_DATABASE_URI, convert_unicode=True)
db = scoped_session(sessionmaker(autocommit=False,autoflush=False,bind=dbengine))

Base = declarative_base()
Base.query = db.query_property()

def init_db():
    import model
    Base.metadata.create_all(bind=dbengine)

def shutdown_db(exception=False):
    db.remove()
