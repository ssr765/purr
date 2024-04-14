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

```bash
cd purr.imageEngine
python -m venv .venv
. .venv\bin\activate    # .\.venv\Scripts\activate on Windows
pip install -r requirements.txt
```
