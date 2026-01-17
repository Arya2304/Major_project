# How to Start the Backend Server

## Quick Start

1. **Open a terminal/command prompt**

2. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```
   Or if you're already in the project root:
   ```bash
   cd C:\Users\aarya\Desktop\Major_project\backend
   ```

3. **Start the Django server:**
   ```bash
   python manage.py runserver
   ```

4. **The server will start on:** http://localhost:8000

## First Time Setup (If Not Done Already)

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Run Migrations
```bash
python manage.py migrate
```

### Step 3: Create Superuser (Optional but Recommended)
```bash
python manage.py createsuperuser
```
Follow the prompts to create an admin account.

## Verify Backend is Running

Once started, you should see:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

## Access Points

- **API Root**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/
- **API Auth**: http://localhost:8000/api/auth/
- **API Signs**: http://localhost:8000/api/sign-language/
- **API Courses**: http://localhost:8000/api/courses/
- **API Progress**: http://localhost:8000/api/progress/

## Troubleshooting

### Port Already in Use
If port 8000 is busy, use a different port:
```bash
python manage.py runserver 8001
```

### Database Errors
Make sure migrations are run:
```bash
python manage.py migrate
```

### Module Not Found
Install dependencies:
```bash
pip install -r requirements.txt
```

## Stop the Server

Press `CTRL + C` in the terminal where the server is running.

