import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {removeAbsence, fetchAbsences} from '../../actions/absenceActions'
import { fetchStagiaires} from '../../actions/stagiaireActions';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


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
  const absences = useSelector(state => state.absences.absences);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAbsences());
  }, [dispatch]);
  const stagiaires = useSelector(state => state.stagiaires.stagiaires);
  useEffect(() => {
      dispatch(fetchStagiaires());
      }, [dispatch]);

//innerjoin
      // const mapAbsencesWithStagiaires = () => {
      //   return absences.map(absence => {
      //     const stagiaire = stagiaires.find(stagiaire => stagiaire.id === absence.idstagiaire);
      //     return {
      //       ...absence,
      //       namestagiaire: stagiaire ? stagiaire.name : '',
      //       email: stagiaire ? stagiaire.email : ''
      //     };
      //   });
      // };
      const absencesWithStagiaires = absences.map(absence => {
          const stagiaire = stagiaires.find(stagiaire => stagiaire.id === absence.idstagiaire);
          return {
            ...absence,
            namestagiaire: stagiaire ? stagiaire.name : '',
            email: stagiaire ? stagiaire.email : ''
          };
        });
      // console.log(absencesWithStagiaires);

  const filteredAbsences = absencesWithStagiaires.filter((absence) => {
    return (
      absence.namestagiaire.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (justifiedFilter === 'all' || (absence.justified ? 'yes' : 'no') === justifiedFilter) &&
      (dateFilter === '' || absence.date === dateFilter)&&
      (fromDateFilter === '' || absence.date >= fromDateFilter) &&
      (toDateFilter === '' || absence.date <= toDateFilter)
    );
  });

  const handleDelete = (id) => {
    console.log(id);
    dispatch(removeAbsence(id));
  };
  // console.log("ttttt",absences)
  // const [absences, setAbsences] = useState([]);
  // const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchAbsences = async () => {
//         try {
//             const response = await axios.get("http://localhost:8001/absences");
//             dispatch(setAbsences(response.data));
//             // console.log(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     fetchAbsences();
// }, [dispatch]);

  
  
  
//   const handleDelete = async(id) => {
//     // console.log("Deleting absence with id:", id);
//     // dispatch(deleteAbsence(id))
//     try {
//         await axios.delete(`http://localhost:8001/absences/${id}`);
//         // If the request is successful, you can dispatch an action to update the state in Redux
//         dispatch(deleteAbsence(id));
//         const updatedAbsencesResponse = await axios.get("http://localhost:8001/absences");
//         dispatch(setAbsences(updatedAbsencesResponse.data));
//     } catch (error) {
//         console.error('Error deleting Absence:', error);
//         // Handle any errors that occur during the delete operation
//     }
    
// }



  return (
    // <div style={{ width: '90%', margin: '0 auto'  }}>
      <div style={{ width: '74%', float:'right' }}>
      {/* <label htmlFor="nameFilter">Search by Name:</label>
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
      /> */}
      <h3>Filter Absences Liste : </h3>

<div class="filter-container date-range">
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="nameFilter">Search by Name:</label>
      <input type="text" class="form-control" id="nameFilter" value={nameFilter} onChange={handleNameChange} />
    </div>
    <div class="form-group col-md-6">
      <label for="justifiedFilter">Filter by Justified:</label>
      <select class="form-control" id="justifiedFilter" value={justifiedFilter} onChange={handleJustifiedChange}>
        <option value="all">All</option>
        <option value="yes">Justified</option>
        <option value="no">Not Justified</option>
      </select>
    </div>
  <button class="btn btn-primary cancel" onClick={handleReset}>Reset</button>

  </div>
  <div class="form-row">
    <div class="form-group ">
      <label for="dateFilter">Date:</label>
      <input type="date" class="form-control" id="dateFilter" placeholder="Search by Date" value={dateFilter} onChange={handleDateChange} />
    </div>
    </div>

    <div class="form-row">
      
    <div class="form-group ">
      <label for="fromDateFilter">Period From :</label>
      <input type="date" class="form-control" id="fromDateFilter" value={fromDateFilter} onChange={handleFromDateChange} />
    </div>
    <div class="form-group ">
      <label for="toDateFilter">To :</label>
      <input type="date" class="form-control" id="toDateFilter" value={toDateFilter} onChange={handleToDateChange} />
    </div>
  </div>
</div>


<h2>Liste des absences : </h2>

<Link to="/absences/add"><button class="btn btn-primary new mb-3">Add absence</button></Link>
<br></br>
<i class="fa fa-download btn btn-primary"  aria-hidden="true">
<ReactHTMLTableToExcel id="test-table-xls-button" className="btn btn-primary"  table="table-absences" filename="absences" sheet="absences" buttonText="Export Table" />

</i>


<table id="table-absences" >
  <thead>
    <tr>
      <th>Date</th>
      <th>Name</th>
      <th>time</th>
      <th>Justified</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredAbsences.map((absence) => (
      <tr key={absence.id}>
        <td>{absence.date}</td>
        <td>{absence.namestagiaire}</td>
        <td>{absence.hours} - {parseInt(absence.hours)+2}</td>
        <td>{absence.justified ? 'Yes' : 'No'}</td>
        <td>
          <Link to={`/update-absence/${absence.id}`}><button class="btn btn-primary edit">Edit</button></Link>
          <button class="btn btn-primary delete ms-3" onClick={() => handleDelete(absence.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default AbsenceList;
