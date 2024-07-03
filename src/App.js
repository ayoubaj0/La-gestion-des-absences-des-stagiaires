import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AbsenceStagiaire from "./components/Absence/AbsenceStagiaire";
import StagiaireList from "./components/Stagiaire/StagiaireList";
import AddStagiaire from "./components/Stagiaire/AddStagiaire";
import UpdateStagiaire from "./components/Stagiaire/UpdateStagiaire";
import AbsenceList from "./components/Absence/AbsenceList";
import AddAbsence from "./components/Absence/AddAbsence";
import UpdateAbsence from "./components/Absence/UpdateAbsence";
import Home from "./components/Absence/Home";
import AbsenceParStagiaire from "./components/Absence/charts/AbsenceParStagiaire";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/absencesparstagiaires" element={<AbsenceStagiaire />} />

        <Route path="/stagiaires" element={<StagiaireList />} />
        <Route path="/stagiaires/add" element={<AddStagiaire />} />
        <Route path="/update-stagiaire/:id" element={<UpdateStagiaire />} />

        <Route path="/absences" element={<AbsenceList />} />
        <Route path="/absences/add" element={<AddAbsence />} />
        <Route path="/update-absence/:id" element={<UpdateAbsence />} />
        
        <Route path="/test" element={<AbsenceParStagiaire />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
