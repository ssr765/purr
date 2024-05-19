<p align="center"><img src="assets/purr.logo.webp" alt="purr. Logo" width="200"></p>

<p align="center"><img src="https://skillicons.dev/icons?i=mysql,vue,laravel,flask,docker,kubernetes" alt="Stack"></p>

# purr.

purr. is the social networks made by cats

## Installation

### Frontend

```bash
cd purr.frontend
npm install
```

### Backend & Database

```bash
cd purr.backend
composer install
cp .env.example .env
# Config the environment variables
php artisan key:generate
php artisan migrate
#php artisan db:seed
```

### Image Engine

The image engine is implemented as a Flask API and uses Gunicorn as the WSGI HTTP server for production environments.

**Required Python Version:**
The application requires Python version 3.7 or higher.

**Tested Python Versions:**
The following Python versions have been tested and are confirmed to be compatible:

- 3.11.9

> [!WARNING]
> Python version 3.12 is currently not supported by this configuration of Gunicorn.

```bash
cd purr.imageEngine
python -m venv .venv
. .venv\bin\activate    # .\.venv\Scripts\activate on Windows
pip install -r requirements.txt
```

## Application of artificial intelligence

### Overview

purr. uses a custom model which is pretrained on the YOLOv8 architecture. This model is designed to provide high accuracy for object detection tasks.

### Environment Setup

#### Building the Docker Image

Build the Docker image using the provided Dockerfile located at purr.imageEngine/ai/Dockerfile. This image includes all necessary dependencies, including GPU support for training models.

```sh
docker build -t pytorch_jupyter -f ./purr.imageEngine/ai/Dockerfile.jupyter .
```

#### Running the Docker Container

To run the Docker container with GPU support and access to Jupyter, use the following command:

```sh
docker run --gpus all -p 8888:8888 -v purr.imageEngine/ai:/workspace -it pytorch_jupyter
```

> You may use an absolute path for mapping the directory on Windows.

### Accessing Jupyter

After running the container, Jupyter server should be accessible via http://localhost:8888.

### Training the Model

To begin training the model, navigate to the Jupyter Notebook provided:

1. Open your browser and go to http://localhost:8888 to access Jupyter.
2. Navigate to the notebooks directory.
3. Open the train.ipynb notebook.
4. Follow the instructions within the notebook to start the training process.

---

*purr. never gonna give you up, never gonna let you down, never gonna run around and desert you. purr. never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you.*
<p align="right">- Rick Catsley (2024)</p>
