#!/home/mimo/Development/dabsa/env/bin/python

from flup.server.fcgi import WSGIServer
from web import app
import dlog

if __name__ == '__main__':
    logger = dlog.get_logger('server')

    try:
        logger.info('starting server')
        WSGIServer(app).run()
    except Exception as e:
        logger.info(e) 
