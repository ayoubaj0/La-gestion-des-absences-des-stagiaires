import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStagiaires,  removeStagiaire} from "../../redux/actions/stagiaireActions";
import {  fetchAbsences,  removeAbsence} from "../../redux/actions/absenceActions";

import ReactHTMLTableToExcel from "react-html-table-to-excel";

function StagiaireList() {
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [filiereFilter, setFiliereFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [stagiairesPerPage] = useState(12);
  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
  };
  const handleIdChange = (e) => {
    setIdFilter(e.target.value);
  };
  const handleFiliereChange = (e) => {
    setFiliereFilter(e.target.value);
  };
  const handleReset = () => {
    setNameFilter("");
    setIdFilter("");
    setFiliereFilter("");
  };
  const stagiaires = useSelector((state) => state.stagiaires.stagiaires);
  const absences = useSelector((state) => state.absences.absences);

  console.log("stagiaires", stagiaires);
  console.log("absences", absences);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStagiaires());
    // dispatch(fetchAbsences());
  }, [stagiaires]);

  // console.log(stagiaires);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this stagiaire?"
    );
    if (confirmed) {
      console.log(id);
      dispatch(removeStagiaire(id));

      absences.forEach((absence) => {
        if (absence.idstagiaire === id) {
          dispatch(removeAbsence(absence.id));
        }
      });
    }
  };

  const filteredStagiaires = stagiaires.filter((stagiaire) => {
    return (
      stagiaire.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (idFilter === "" || stagiaire.id === idFilter) &&
      (filiereFilter === "" ||stagiaire.filiere === filiereFilter)
    );
  });

  // Pagination
  const indexOfLastStagiaire = currentPage * stagiairesPerPage;
  const indexOfFirstStagiaire = indexOfLastStagiaire - stagiairesPerPage;
  const currentStagiaires = filteredStagiaires.slice(
    indexOfFirstStagiaire,
    indexOfLastStagiaire
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
 
    <div
      style={{ width: "74%", float: "right" }}
      className="card-container content"
    >
      <h2 className="text-info">Filter Stagiaire Liste : </h2>
      <div className="filter-container">
        <div class="form-row date-range">
          <div class="form-group ">
            <label for="nameFilter">Search by Name:</label>
            <input
              type="text"
              class="form-control"
              id="nameFilter"
              value={nameFilter}
              onChange={handleNameChange}
            />
            <button class="button primary cancel" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div class="form-group ">
            <label for="idFilter">Search by id :</label>
            <input
              type="text"
              class="form-control"
              id="idFilter"
              value={idFilter}
              onChange={handleIdChange}
            />
          </div>
          <div class="form-group ">
            <label for="filiereFilter">Filter by filiere:</label>
            <select
              class="form-control"
              id="filiereFilter"
              value={filiereFilter}
              onChange={handleFiliereChange}
            >
              <option value={""}>--choose filiere--</option>
              <option value={"Développement Digital"}>Développement Digital</option>
              <option value={"Gestion des Entreprises"}>Gestion des Entreprises</option>
              <option value={"Génie Civil"}>Génie Civil</option>
            </select>
          </div>
        </div>
      </div>

      <h2 className="text-info">Liste stagiaire : </h2>
      <Link to="/stagiaires/add">
        <button class="btn btn-primary new mb-3">Add stagiaire</button>
      </Link>
      <br></br>
      <i class="fa fa-download btn btn-primary" aria-hidden="true">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="btn btn-primary"
          table="stagiaireTable"
          filename="stagiaires"
          sheet="stagiaires"
          buttonText="Export Table"
        />
      </i>
      <table id="stagiaireTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date_of_birth</th>
            <th>Age</th>

            <th>Filiere</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        {console.log(stagiaires)}
        <tbody>
          {currentStagiaires.map((stagiaire, index) => (
            <tr key={index}>
              <td>{stagiaire.id}</td>
              <td>{stagiaire.name}</td>
              <td>{stagiaire.dateofbirth}</td>
              <td>{new Date().getFullYear() - new Date(stagiaire.dateofbirth).getFullYear()}</td>
              <td>{stagiaire.filiere}</td>
              <td>{stagiaire.email}</td>
              <td>
                <Link to={`/update-stagiaire/${stagiaire.id}`}>
                  <button class="btn btn-primary edit">Edit</button>
                </Link>
                {/* <button
                  class="btn btn-danger delete ms-4"
                  onClick={() => handleDelete(stagiaire.id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <ul className="pagination">
        {filteredStagiaires.length > stagiairesPerPage &&
          Array.from({
            length: Math.ceil(filteredStagiaires.length / stagiairesPerPage),
          }).map((_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default StagiaireList;
