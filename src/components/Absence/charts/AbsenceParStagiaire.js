import React, { useState, useEffect } from "react";
import axios from "axios";

function AbsenceParStagiaire() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedStagiaire, setSearchedStagiaire] = useState({});

  useEffect(() => {
    console.log("Searched Stagiaire Updated:", searchedStagiaire);
  }, [searchedStagiaire]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/absences?idstagiaire=${searchTerm}`
      );
      const stagiaireData = response.data;
      const StagiaireAbsencesData = stagiaireData.reduce((acc, absence) => {
        if (!acc[absence.idstagiaire]) {
          acc[absence.idstagiaire] = {
            id: absence.idstagiaire,
            total: 0,
            justified: 0,
            unjustified: 0,
          };
        }
        acc[absence.idstagiaire].total++;
        if (absence.justified) {
          acc[absence.idstagiaire].justified++;
        } else {
          acc[absence.idstagiaire].unjustified++;
        }
        return acc;
      }, {});

      setSearchedStagiaire(StagiaireAbsencesData);
    } catch (error) {
      console.error("Error fetching stagiaire data:", error);
      setSearchedStagiaire(null);
    }
  };

  return (
    <div style={{ width: "74%", float: "right" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Search Stagiaire"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSearch}>Valider</button>
      </div>
      {searchedStagiaire && (
        <table>
          <thead>
            <tr>
              <th>idstagiaire</th>
              <th>Total Absences</th>
              <th>Justified Absences</th>
              <th>Unjustified Absences</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(searchedStagiaire).map((id) => (
              <tr key={id}>
                <td>{searchedStagiaire[id].id}</td>
                <td>{searchedStagiaire[id].total}</td>
                <td>{searchedStagiaire[id].justified}</td>
                <td>{searchedStagiaire[id].unjustified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default AbsenceParStagiaire;
