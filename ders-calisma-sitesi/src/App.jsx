import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import ScoreCalculator from './pages/ScoreCalculator';
import Pomodoro from './pages/Pomodoro';
import Personal from './pages/Personal';
import TestAndSolution from './pages/TestAndSolution';
import GunlukSoz from './pages/GunlukSoz';
import Tyt from './pages/tyt/Tyt';
import TytMat from './pages/tyt/TytMat';
import TytTurkce from './pages/tyt/TytTurkce';
import AytMat from './pages/ayt/AytMat';
import AytKonular from './pages/ayt/Ayt';
import AytTur from './pages/ayt/AytTur';
import Login from './pages/Login'; // Login sayfası
import SignUp from './pages/SignUp'; // Signup sayfası
import Uni from './pages/Hayallerim/Uni'; // Uni sayfası buraya import edildi

import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout Gerektiren Sayfalar */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/score-calculator"
          element={
            <MainLayout>
              <ScoreCalculator />
            </MainLayout>
          }
        />
        <Route
          path="/pomodoro"
          element={
            <MainLayout>
              <Pomodoro />
            </MainLayout>
          }
        />
        <Route
          path="/personal"
          element={
            <MainLayout>
              <Personal />
            </MainLayout>
          }
        />
        <Route
          path="/test"
          element={
            <MainLayout>
              <TestAndSolution />
            </MainLayout>
          }
        />
        <Route
          path="/gunlukSoz"
          element={
            <MainLayout>
              <GunlukSoz />
            </MainLayout>
          }
        />
        <Route
          path="/tyt"
          element={
            <MainLayout>
              <Tyt />
            </MainLayout>
          }
        />
        <Route
          path="/tytMat"
          element={
            <MainLayout>
              <TytMat />
            </MainLayout>
          }
        />
        <Route
          path="/tytTurkce"
          element={
            <MainLayout>
              <TytTurkce />
            </MainLayout>
          }
        />
        <Route
          path="/ayt"
          element={
            <MainLayout>
              <AytKonular />
            </MainLayout>
          }
        />
        <Route
          path="/AytMat"
          element={
            <MainLayout>
              <AytMat />
            </MainLayout>
          }
        />
        <Route
          path="/AytTur"
          element={
            <MainLayout>
              <AytTur />
            </MainLayout>
          }
        />

        {/* Hayallerim altında Uni seçeneği */}
        <Route
          path="/hayallerim/uni"
          element={
            <MainLayout>
              <Uni />
            </MainLayout>
          }
        />

        {/* Layout Olmayan Sayfalar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
