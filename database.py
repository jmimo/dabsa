import config
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import dlog

logger = dlog.get_logger('database')
logger.info(config.SQLALCHEMY_DATABASE_URI)

dbengine = create_engine(config.SQLALCHEMY_DATABASE_URI, convert_unicode=True, echo=True)

db_engine_logger = dlog.get_logger('sqlalchemy.engine')
db_orm_logger = dlog.get_logger('sqlalchemy.orm')
db_pool_logger = dlog.get_logger('sqlalchemy.pool')
db_dialect_logger = dlog.get_logger('sqlalchemy.dialects')

db = scoped_session(sessionmaker(autocommit=False,autoflush=True,bind=dbengine))

Base = declarative_base()
Base.query = db.query_property()

def init_db():
    import model
    Base.metadata.create_all(bind=dbengine)

def shutdown_db(exception=False):
    db.remove()
