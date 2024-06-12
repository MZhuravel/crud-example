import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import TodoList from './components/TodoList';
import Weather from './components/Weather';
import './app.css';

function App() {
  return (
    <div className="app-container">
      <Router>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Todo List
              </NavLink>
            </li>
            <li>
              <NavLink to="/weather" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Weather
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<TodoList />} exact />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
