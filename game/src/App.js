import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Games from './pages/Games'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'

import Memory from './games/Memory'
import Hangman from './games/Hangman'
import Quiz from './games/Quiz'
import Difference from './games/Difference'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/games" element={<Games />}>
            <Route path="hangman" element={<Hangman />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="memory" element={<Memory />} />
            <Route path="difference" element={<Difference />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/passwordrecover" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
