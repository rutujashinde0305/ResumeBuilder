# Resume Builder Backend API

A Node.js/Express backend for the Resume Builder application with MongoDB integration.

## Features

- ✅ User authentication (registration/login)
- ✅ Resume CRUD operations (Create, Read, Update, Delete)
- ✅ File upload for resume parsing
- ✅ Job matching endpoint
- ✅ MongoDB data persistence
- ✅ CORS enabled for frontend integration

## Setup

1. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **MongoDB Setup:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in `.env`

4. **Start Server:**
   ```bash
   npm run dev  # Development with nodemon
   npm start    # Production
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Resumes
- `POST /api/resumes` - Save new resume
- `GET /api/resumes/:userId` - Get user's resumes
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### File Operations
- `POST /api/upload` - Upload resume file for parsing
- `POST /api/job-match` - Calculate job match score

### Health Check
- `GET /api/health` - Server health status

## Integration with Frontend

The backend is designed to work with the React frontend. Update your frontend API calls to point to `http://localhost:5000/api` instead of external services.

## Deployment

For production deployment:
1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set up proper environment variables
4. Consider using PM2 for process management

## Technologies Used

- **Express.js** - Web framework
- **MongoDB/Mongoose** - Database and ODM
- **Multer** - File upload handling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing