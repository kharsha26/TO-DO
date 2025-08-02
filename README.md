# To-Do Manager with AI Assistant

A full-stack application with React frontend, FastAPI backend, and OpenAI integration.

## Features

- Create, view, and manage to-do items
- Mark tasks as complete
- Integrated AI assistant powered by OpenAI
- Responsive design for all devices

## Project Structure
to-do-manager/
├── backend/ # FastAPI backend
│ ├── main.py # Backend API routes
│ ├── requirements.txt # Python dependencies
│ └── .env # Environment variables
├── frontend/ # React frontend
│ ├── public/ # Static files
│ ├── src/ # React components
│ │ ├── App.js # Main application
│ │ └── App.css # Styles
│ └── package.json # Frontend dependencies
├── .gitignore # Ignored files
└── README.md # This file

## Prerequisites

- Python 3.7+
- Node.js 16+
- npm or yarn
- OpenAI API key

## Setup Instructions

### 1. Backend Setup

1. Navigate to backend directory:
   cd backend


Create and activate virtual environment:
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate


Install dependencies:
pip install -r requirements.txt

Create .env file:
echo "OPENAI_API_KEY=your_api_key_here" > .env

Navigate to frontend directory:
cd ../frontend
Install dependencies:
npm install

Running the Application
Start the backend server (from /backend directory):
python -m uvicorn main:app --reload


Start the frontend (from /frontend directory):
npm start


API Endpoints
Method	Endpoint	Description
GET	/api/todos	Get all to-do items
POST	/api/todos	Create new to-do item
PUT	/api/todos/:id	Update to-do item status
POST	/api/ask	Ask question to AI assistant


Troubleshooting
Common Issues
ModuleNotFoundError:

Ensure virtual environment is activated

Run pip install -r requirements.txt again

CORS Errors:

Verify allow_origins includes your frontend URL (http://localhost:3000)

404 Not Found:

Check backend is running

Verify frontend API calls match backend routes exactly

React-scripts not found:

Run npm install in frontend directory
