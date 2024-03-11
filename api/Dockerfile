FROM python:3
WORKDIR /app
COPY journal journal
COPY my_journal my_journal
COPY requirements.txt requirements.txt
COPY manage.py manage.py
COPY media media

RUN pip install -r requirements.txt

CMD gunicorn --bind 0.0.0.0:8000 food_fan.wsgi
