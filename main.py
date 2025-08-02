from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

# In-memory database
todos_db = [
    {"id": 1, "text": "Learn FastAPI", "completed": False},
    {"id": 2, "text": "Build a full-stack app", "completed": False}
]

# Models
class Todo(BaseModel):
    id: int
    text: str
    completed: bool

class TodoCreate(BaseModel):
    text: str

class TodoUpdate(BaseModel):
    completed: bool

class Question(BaseModel):
    question: str

# API Endpoints
@app.get("/api/todos", response_model=List[Todo])
async def get_todos():
    return todos_db

@app.post("/api/todos", response_model=Todo)
async def create_todo(todo: TodoCreate):
    new_id = max(todo["id"] for todo in todos_db) + 1 if todos_db else 1
    new_todo = {
        "id": new_id,
        "text": todo.text,
        "completed": False
    }
    todos_db.append(new_todo)
    return new_todo

@app.put("/api/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, todo_update: TodoUpdate):
    for todo in todos_db:
        if todo["id"] == todo_id:
            todo["completed"] = todo_update.completed
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.post("/api/ask")
async def ask_question(question: Question):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Keep answers brief."},
                {"role": "user", "content": question.question}
            ],
            max_tokens=100
        )
        return {"answer": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Welcome to the Todo API. Use /api/todos to access todos."}