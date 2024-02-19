import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
// import absencesData from '../../data/absences.json';
import {deleteAbsence, setAbsences} from '../../actions/absenceActions'

import axios from "axios";

function AbsenceList() {
  const [nameFilter, setNameFilter] = useState('');
  const [justifiedFilter, setJustifiedFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [fromDateFilter, setFromDateFilter] = useState('');
  const [toDateFilter, setToDateFilter] = useState('');

  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleJustifiedChange = (e) => {
    setJustifiedFilter(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDateFilter(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDateFilter(e.target.value);
  };
  const handleReset = () => {
    setNameFilter('');
    setJustifiedFilter('all');
    setDateFilter('');
    setFromDateFilter('');
    setToDateFilter('');
  };
  const [absences, setAbsences] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAbsences = async () => {
        try {
            const response = await axios.get("http://localhost:8001/absences");
            dispatch(setAbsences(response.data));
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchAbsences();
}, [dispatch]);

  
  
  const filteredAbsences = absences.filter((absence) => {
    return (
      absence.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (justifiedFilter === 'all' || (absence.justified ? 'yes' : 'no') === justifiedFilter) &&
      (dateFilter === '' || absence.date === dateFilter)&&
      (fromDateFilter === '' || absence.date >= fromDateFilter) &&
      (toDateFilter === '' || absence.date <= toDateFilter)
    );
  });
  const handleDelete = async(id) => {
    // console.log("Deleting absence with id:", id);
    // dispatch(deleteAbsence(id))
    try {
        await axios.delete(`http://localhost:8001/absences/${id}`);
        // If the request is successful, you can dispatch an action to update the state in Redux
        dispatch(deleteAbsence(id));
        const updatedAbsencesResponse = await axios.get("http://localhost:8001/absences");
        dispatch(setAbsences(updatedAbsencesResponse.data));
    } catch (error) {
        console.error('Error deleting Absence:', error);
        // Handle any errors that occur during the delete operation
    }
}

  return (
    <div>
      <label htmlFor="nameFilter">Search by Name:</label>
      <input
        type="text"
        id="nameFilter"
        value={nameFilter}
        onChange={handleNameChange}
      />
      <label htmlFor="justifiedFilter">Filter by Justified:</label>
      <select id="justifiedFilter" value={justifiedFilter} onChange={handleJustifiedChange}>
        <option value="all">All</option>
        <option value="yes">Justified</option>
        <option value="no">Not Justified</option>
      </select>
      <label htmlFor="DateFilter">Date:</label>

      <input
        type="date"
        placeholder="Search by Date"
        value={dateFilter}
        onChange={handleDateChange}
      />
      <label htmlFor="fromDateFilter">From Date:</label>
      <input
        type="date"
        id="fromDateFilter"
        value={fromDateFilter}
        onChange={handleFromDateChange}
      />
      <label htmlFor="toDateFilter">To Date:</label>
      <input
        type="date"
        id="toDateFilter"
        value={toDateFilter}
        onChange={handleToDateChange}
      />
      <button onClick={handleReset}>Reset</button>
      <Link to="/absences/add"><button >Add absence</button></Link>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Hours</th>
            <th>Justified</th>
          </tr>
        </thead>
        <tbody>
          {filteredAbsences.map((absence) => (
            <tr key={absence.id}>
              <td>{absence.date}</td>
              <td>{absence.name}</td>
              <td>{absence.hours}</td>
              <td>{absence.justified ? 'Yes' : 'No'}</td>
              <td>
                                <Link to={`/update-absence/${absence.id}`}><button>Edit</button></Link>
                                <button onClick={() => handleDelete(absence.id)}>Delete</button>
                            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbsenceList;
