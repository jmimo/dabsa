import config
import logging

logging.basicConfig()
log_file_handler = logging.FileHandler(config.LOGFILE)
formatter = logging.Formatter('%(asctime)s %(name)s %(module)s %(levelname)s %(message)s')
log_file_handler.setFormatter(formatter)

def get_logger(name):
    logger = logging.getLogger(name)
    logger.addHandler(log_file_handler)
    logger.setLevel(config.LOGLEVEL)
    return logger
