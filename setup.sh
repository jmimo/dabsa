#!/bin/bash

rm -fR env

virtualenv env
. env/bin/activate
pip install flask sqlalchemy numpy
