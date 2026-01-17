# Backend Setup Guide

## Database Setup

### Option 1: SQLite (Default - For Development)
The project is configured to use SQLite by default. No setup needed!

### Option 2: PostgreSQL (For Production)

1. Install PostgreSQL from https://www.postgresql.org/download/

2. Create a database:
```sql
CREATE DATABASE signlearn_db;
```

3. Set environment variables:
```bash
# Windows PowerShell
$env:USE_POSTGRESQL="true"
$env:DB_NAME="signlearn_db"
$env:DB_USER="postgres"
$env:DB_PASSWORD="your_password"
$env:DB_HOST="localhost"
$env:DB_PORT="5432"
```

4. Run migrations:
```bash
python manage.py migrate
```

## Create Superuser

Run this command and follow the prompts:
```bash
python manage.py createsuperuser
```

You'll be asked for:
- Username
- Email address
- Password

## Run Server

```bash
python manage.py runserver
```

The API will be available at: http://localhost:8000

## API Endpoints

- Admin: http://localhost:8000/admin
- API Auth: http://localhost:8000/api/auth/
- API Signs: http://localhost:8000/api/sign-language/
- API Courses: http://localhost:8000/api/courses/
- API Progress: http://localhost:8000/api/progress/

