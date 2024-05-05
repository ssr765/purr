FROM python:3.11-slim

WORKDIR /code

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6 -y

COPY app app
COPY ai/models/purr.model.pt ai/models/purr.model.pt
COPY requirements.txt .

RUN pip install -r requirements.txt

WORKDIR /code/app

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "main:app"]