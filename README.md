<p align="center"><img src="assets/purr.logo.webp" alt="purr. Logo" width="200"></p>

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
