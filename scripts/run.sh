#!/usr/bin/env bash

python manage.py collectstatic --no-input
python manage.py migrate
gunicorn -w 4 -b 0.0.0.0:8000 backend_project.wsgi:application
