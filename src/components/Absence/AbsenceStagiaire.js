import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import axios from "axios";


const AbsenceStagiaire = () => {
    const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [fromDateFilter, setFromDateFilter] = useState('');
  const [toDateFilter, setToDateFilter] = useState('');
  // Function to group absences data by stagiaire name
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
  const groupAbsencesByName = () => {
    const absencesByName = {};
    const filteredAbsences = absences.filter((absence) => {
        return (
          absence.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          (dateFilter === '' || absence.date === dateFilter)&&
          (fromDateFilter === '' || absence.date >= fromDateFilter) &&
          (toDateFilter === '' || absence.date <= toDateFilter)
        );
      });

    // Initialize absencesByName object with empty arrays for each stagiaire name
    filteredAbsences.forEach((stagiaire) => {
      absencesByName[stagiaire.name] = {
        name: stagiaire.name,
        totalHours: 0,
        justifiedHours: 0,
        notJustifiedHours: 0,
      };
    });

    // Group absences by stagiaire name and calculate total, justified, and not justified hours
    filteredAbsences.forEach((absence) => {
      const { name, hours, justified } = absence;
      if (absencesByName.hasOwnProperty(name)) {
        absencesByName[name].totalHours += hours;
        if (justified) {
          absencesByName[name].justifiedHours += hours;
        } else {
          absencesByName[name].notJustifiedHours += hours;
        }
      }
    });

    return Object.values(absencesByName);
  };

  const absencesByStagiaire = groupAbsencesByName();
  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleFromDateFilterChange = (e) => {
    setFromDateFilter(e.target.value);
  };

  const handleToDateFilterChange = (e) => {
    setToDateFilter(e.target.value);
  };
  const handleReset = () => {
    setNameFilter('');
    setDateFilter('');
    setFromDateFilter('');
    setToDateFilter('');
  };
  return (
    <div>
      <h2>Absences by Stagiaire</h2>
      <div>
        <label htmlFor="nameFilter">Filter by Name:</label>
        <input
          type="text"
          id="nameFilter"
          value={nameFilter}
          onChange={handleNameFilterChange}
        />
      </div>
      <div>
        <label htmlFor="dateFilter">Filter by Date:</label>
        <input
          type="date"
          id="dateFilter"
          value={dateFilter}
          onChange={handleDateFilterChange}
        />
      </div>
      <div>
        <label htmlFor="fromDateFilter">From:</label>
        <input
          type="date"
          id="fromDateFilter"
          value={fromDateFilter}
          onChange={handleFromDateFilterChange}
        />
        <label htmlFor="toDateFilter">To:</label>
        <input
          type="date"
          id="toDateFilter"
          value={toDateFilter}
          onChange={handleToDateFilterChange}
        />
      </div>
      <button onClick={handleReset}>Reset</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Hours Absent</th>
            <th>Justified Hours</th>
            <th>Not Justified Hours</th>
          </tr>
        </thead>
        <tbody>
          {absencesByStagiaire.map((absence) => (
            <tr key={absence.name}>
              <td>{absence.name}</td>
              <td>{absence.totalHours}</td>
              <td>{absence.justifiedHours}</td>
              <td>{absence.notJustifiedHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbsenceStagiaire;
