import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000/api' 
  : '/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    
    try {
      const response = await axios.post(`${API_BASE}/todos`, {
        text: newTodo
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      await axios.put(`${API_BASE}/todos/${id}`, {
        completed: !todo.completed
      });
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/ask`, {
        question
      });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error asking question:', error);
      setAnswer('Sorry, I encountered an error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>To-Do Manager with AI Assistant</h1>
      
      <div className="todo-container">
        <h2>My To-Dos</h2>
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li 
              key={todo.id} 
              className={todo.completed ? 'completed' : ''}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="ai-container">
        <h2>Ask the AI Assistant</h2>
        <div className="question-input">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
          />
          <button onClick={askQuestion} disabled={loading}>
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
        {answer && (
          <div className="answer">
            <h3>Answer:</h3>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;