#!/usr/bin/env bash

python manage.py collectstatic --no-input
gunicorn -w 4 -b 0.0.0.0:9000 backend_project.wsgi:application