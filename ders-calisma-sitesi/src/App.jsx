import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';

import Pomodoro from './pages/Pomodoro';
import Personal from './pages/Personal';

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
import Notlarım from './pages/Hayallerim/Notlarım'; // Uni sayfası buraya import edildi
import Netlerim from './pages/hayallerim/NetHesaplama'; // Uni sayfası buraya import edildi



import './index.css';
import Bilgiler from './pages/Bilgiler';

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
          path="/gunlukSoz"
          element={
            <MainLayout>
              <GunlukSoz />
            </MainLayout>
          }
        />
        <Route
          path="/bilgiler"
          element={
            <MainLayout>
              <Bilgiler />
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
        <Route
          path="/hayallerim/notlarım"
          element={
            <MainLayout>
              <Notlarım />
            </MainLayout>
          }
        />
        <Route
          path="/hayallerim/netlerim"
          element={
            <MainLayout>
              <Netlerim />
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
