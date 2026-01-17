# Starting the SignLearn Platform

## Quick Start

### Backend (Django) - Terminal 1

```bash
cd backend
python manage.py runserver
```

Backend will run at: **http://localhost:8000**

### Frontend (React) - Terminal 2

```bash
cd frontend
npm run dev
```

Frontend will run at: **http://localhost:3000**

## First Time Setup

### 1. Create Superuser (Backend)

In the backend terminal:
```bash
cd backend
python manage.py createsuperuser
```

Enter:
- Username: admin
- Email: admin@example.com
- Password: (choose a secure password)

### 2. Access Admin Panel

Visit: http://localhost:8000/admin

Login with your superuser credentials to:
- Create Roles (normal, deaf, mute)
- Add Categories
- Add Signs
- Create Courses
- Upload Videos

## API Endpoints

- **Admin Panel**: http://localhost:8000/admin
- **API Root**: http://localhost:8000/api/
- **Auth**: http://localhost:8000/api/auth/
- **Signs**: http://localhost:8000/api/sign-language/
- **Courses**: http://localhost:8000/api/courses/
- **Progress**: http://localhost:8000/api/progress/

## Frontend Routes

- **Home**: http://localhost:3000
- **Signs**: http://localhost:3000/signs
- **Courses**: http://localhost:3000/courses
- **Dashboard**: http://localhost:3000/dashboard (requires login)
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register

## Database

Currently using **SQLite** (db.sqlite3 in backend folder) for development.

To switch to PostgreSQL:
1. Install PostgreSQL
2. Create database: `CREATE DATABASE signlearn_db;`
3. Set environment variable: `$env:USE_POSTGRESQL="true"`
4. Update DB credentials in settings.py or environment variables
5. Run migrations: `python manage.py migrate`

## Troubleshooting

### Backend won't start
- Check if port 8000 is available
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check database connection

### Frontend won't start
- Check if port 3000 is available
- Ensure dependencies are installed: `npm install`
- Check if backend is running on port 8000

### Database errors
- Run migrations: `python manage.py migrate`
- Check database settings in `signlearn/settings.py`

## Next Steps

1. Create superuser account
2. Add initial data through admin panel:
   - Create Roles (normal, deaf, mute)
   - Add Categories for signs
   - Add some Signs with videos
   - Create Courses
3. Test the frontend:
   - Register a new user
   - Browse signs
   - Enroll in courses
   - Track progress

