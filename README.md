# Resume Builder - Full Stack Application

A modern, full-stack resume builder with AI-powered features including resume parsing, job matching, and cloud storage.

## 🏗️ Architecture

### Frontend (React + TypeScript + Vite)
- **Framework:** React 18 with TypeScript
- **UI:** Shadcn/ui + Tailwind CSS
- **State Management:** React Context
- **PDF Generation:** React-PDF
- **Build Tool:** Vite

### Backend (Node.js + Express + MongoDB)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT tokens
- **File Upload:** Multer

### External APIs
- **ApyHub:** Resume parsing and job matching
- **MongoDB Atlas:** Cloud database (optional)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- ApyHub API key

### 1. Clone and Install
```bash
git clone <repository-url>
cd resume-builder

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Environment Setup
```bash
# Frontend environment
cp .env.example .env
# Edit .env with your API keys

# Backend environment
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI
```

### 3. Start Development Servers
```bash
# Start both frontend and backend
npm run dev:full

# Or start separately:
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### 4. Access the Application
- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:5000/api/health

## 🔑 API Keys Setup

### ApyHub API Key
1. Visit [https://apyhub.com/](https://apyhub.com/)
2. Create account and get API key
3. Add to `.env`: `VITE_APY_API_KEY=your_key_here`
4. Add to `backend/.env`: `APY_API_KEY=your_key_here`

### MongoDB Setup
```bash
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/resume-builder

# Or MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-builder
```

## 📋 Features

### ✅ Implemented
- **Resume Builder UI** - Drag-and-drop form builder
- **PDF Export** - Generate professional PDFs
- **Local Storage** - Save resumes locally
- **Cloud Storage** - Save/load from MongoDB
- **Resume Parsing** - Upload PDF/DOC files for auto-fill
- **Job Matching** - Calculate compatibility scores
- **User Authentication** - Register/login system
- **Responsive Design** - Mobile-friendly interface

### 🚧 In Development
- Advanced ATS scoring
- Resume templates marketplace
- Collaboration features
- Analytics dashboard

## 🛠️ Development

### Project Structure
```
resume-builder/
├── src/                    # Frontend React app
│   ├── components/         # Reusable UI components
│   ├── context/           # React Context for state
│   ├── lib/               # Utilities and API clients
│   ├── pages/             # Page components
│   └── types/             # TypeScript definitions
├── backend/               # Node.js Express server
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Express middleware
│   └── uploads/          # File upload directory
├── public/               # Static assets
└── dist/                 # Build output
```

### Available Scripts
```bash
# Development
npm run dev              # Frontend only
npm run dev:full         # Frontend + Backend
npm run dev:backend      # Backend only
npm run dev:frontend     # Frontend only

# Building
npm run build           # Build for production
npm run preview         # Preview production build

# Testing
npm run test            # Run tests
npm run test:watch      # Watch mode tests

# Code Quality
npm run lint            # ESLint checking
```

## 🔌 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Resume Endpoints
- `POST /api/resumes` - Save new resume
- `GET /api/resumes/:userId` - Get user's resumes
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### File Operations
- `POST /api/upload` - Upload resume file
- `POST /api/job-match` - Calculate job match score

### External APIs (ApyHub)
- `POST /sharpapi/api/v1/hr/parse_resume` - Parse resume
- `POST /sharpapi/api/v1/hr/resume_job_match_score` - Job matching

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd backend
npm start
# Configure environment variables
```

### Full Stack (Docker)
```bash
# Add Docker setup for both services
docker-compose up
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [ApyHub](https://apyhub.com/) for AI-powered HR APIs
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [React PDF](https://react-pdf.org/) for PDF generation
- [MongoDB](https://mongodb.com/) for database solutions</content>
<parameter name="filePath">d:\Resume-Builder\README.md
