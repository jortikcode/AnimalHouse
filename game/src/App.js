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
          <Route path="/game" element={<Homepage />} />
          <Route path="/game/games" element={<Games />}>
            <Route path="/game/games/hangman" element={<Hangman />} />
            <Route path="/game/games/quiz" element={<Quiz />} />
            <Route path="/game/games/memory" element={<Memory />} />
            <Route path="/game/games/difference" element={<Difference />} />
          </Route>
          <Route path="/game/login" element={<Login />} />
          <Route path="/game/passwordrecover" element={<ForgotPassword />} />
          <Route path="/game/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
