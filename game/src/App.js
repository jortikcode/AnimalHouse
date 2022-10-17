import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage'
import Games from './pages/Games'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Memory from './games/Memory'
import Hangman from './games/Hangman'
import Quiz from './games/Quiz'
import Difference from './games/Difference'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggle = (event) => {
    // A switch from light mode to dark mode should occur
    if (!darkMode)
      document.getElementById("root").classList.add("dark");
    else
      document.getElementById("root").classList.remove("dark");
    setDarkMode(!darkMode);
  }

  return (
    <>
      <Router>
        <Navbar togglerColorMode={toggle} darkMode={darkMode}/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/games" element={<Games />}>
            <Route path="hangman" element={<Hangman />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="memory" element={<Memory />} />
            <Route path="difference" element={<Difference />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
