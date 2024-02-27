import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { fetchStagiaires} from '../../actions/stagiaireActions';
import { fetchAbsences } from '../../actions/absenceActions';
import { Link } from "react-router-dom"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';



function AbsenceStagiaire() {
  const [showTable, setShowTable] = useState(false); // State variable to manage table visibility

    

  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [fromDateFilter, setFromDateFilter] = useState('');
  const [toDateFilter, setToDateFilter] = useState('');

  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
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
    setDateFilter('');
    setFromDateFilter('');
    setToDateFilter('');
  };

  const dispatch = useDispatch();

  const absences = useSelector(state => state.absences.absences);
  useEffect(() => {
    dispatch(fetchAbsences());
    }, [dispatch]);

  const stagiaires = useSelector(state => state.stagiaires.stagiaires);
  useEffect(() => {
      dispatch(fetchStagiaires());
      }, [dispatch]);
  // console.log(stagiaires);
  // console.log(absences);

  //innerjoin
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
      (dateFilter === '' || absence.date === dateFilter)&&
      (fromDateFilter === '' || absence.date >= fromDateFilter) &&
      (toDateFilter === '' || absence.date <= toDateFilter)
    );
  });
  const toggleTable = (namestagiaire) => {
    !showTable?setNameFilter(namestagiaire):setNameFilter(""); 
    setShowTable(!showTable);
    
};
console.log("my name",nameFilter);

// console.log(filteredAbsences);

//   const [absences, setAbsences] = useState([]);
//   const dispatch = useDispatch();
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

  // const groupAbsencesByName = () => {
  //   const absencesByName = {};
    
  //   // Initialize absencesByName object with empty arrays for each stagiaire name
  //   filteredAbsences.forEach((stagiaire) => {
  //     absencesByName[stagiaire.namestagiaire] = {
  //       name: stagiaire.namestagiaire,
  //       totalHours: 0,
  //       justifiedHours: 0,
  //       notJustifiedHours: 0,
  //     };
  //   });

  //   // Group absences by stagiaire name and calculate total, justified, and not justified hours
  //   filteredAbsences.forEach((absence) => {
  //     const { name, hours, justified } = absence;
  //     if (absencesByName.hasOwnProperty(name)) {
  //       absencesByName[name].totalHours += hours;
  //       if (justified) {
  //         absencesByName[name].justifiedHours += hours;
  //       } else {
  //         absencesByName[name].notJustifiedHours += hours;
  //       }
  //     }
  //   });

  //   return Object.values(absencesByName);
  // };

  // const absencesByStagiaire = groupAbsencesByName();
  const groupAbsencesById = () => {
    const absencesById = [];
  
    filteredAbsences.forEach((absence) => {
      const { idstagiaire, namestagiaire, hours, justified } = absence;
  
      if (!absencesById[idstagiaire]) {
        absencesById[idstagiaire] = {
          idstg: idstagiaire,
          namestg: namestagiaire,
          totalHours: 0,
          justifiedHours: 0,
          notJustifiedHours: 0,
        };
      }
  
      absencesById[idstagiaire].totalHours += 2;
      if (justified) {
        absencesById[idstagiaire].justifiedHours += 2;
      } else {
        absencesById[idstagiaire].notJustifiedHours += 2;
      }
    });
  
    // Filter out any undefined elements in the array
    return absencesById.filter(Boolean);
  };
  
  const absencesByStagiaire = groupAbsencesById();
  console.log("absencesByStagiaire",absencesByStagiaire)
  
 
  return (
    // <div style={{ width: '90%', margin: '0 auto' }}>
    <div style={{ width: '74%', float:'right' }}>
     <h3>Filter stagiaire statistiques : </h3>

<div class="filter-container date-range">
  <div class="form-row">
    <div class="form-group ">
      <label for="nameFilter">Search by Name:</label>
      <input type="text" class="form-control" id="nameFilter" value={nameFilter} onChange={handleNameChange} />
    </div>
    <div class="form-group ">
    <label for="dateFilter">Date:</label>
      <input type="date" class="form-control" id="dateFilter" placeholder="Search by Date" value={dateFilter} onChange={handleDateChange} />
    </div>
  <button class="btn btn-primary cancel" onClick={handleReset}>Reset</button>

  </div>
  
  <div class="form-row">
    <div class="form-group ">
      <label for="fromDateFilter"> Period From :</label>
      <input type="date" class="form-control" id="fromDateFilter" value={fromDateFilter} onChange={handleFromDateChange} />
    </div>
    <div class="form-group ">
      <label for="toDateFilter">To :</label>
      <input type="date" class="form-control" id="toDateFilter" value={toDateFilter} onChange={handleToDateChange} />
    </div>
  </div>
</div>


      <h2>Liste absences stagiaire</h2>
      <i class="fa fa-download btn btn-primary"  aria-hidden="true">
<ReactHTMLTableToExcel id="test-table-xls-button" className="btn btn-primary"  table="absences-stagiaire" filename="absences-stagiaire" sheet="absences-stagiaire" buttonText="Export Table" />

</i>

      <table id="absences-stagiaire">
        <thead>
          <tr>
            <th>Id Stagiaire</th>
            <th>Name</th>
            <th>Total Hours Absent</th>
            <th>Justified Hours</th>
            <th>Not Justified Hours</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {absencesByStagiaire.map((absence) => (
            <tr key={absence.idstg}>
              <td>{absence.idstg}</td>
              <td>{absence.namestg}</td>
              <td>{absence.totalHours}</td>
              <td>{absence.justifiedHours}</td>
              <td>{absence.notJustifiedHours}</td>
              <td>
                  {/* <Link to={`/update-absence/${absence.id}`}><button>Edit</button></Link> */}
                  <button onClick={() => toggleTable(absence.namestg)}>{showTable ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}</button>
            
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
      
      {showTable && ( 
      <table>
         <thead>
          <tr>
            <th>Date</th>
            {/* <th>Name</th> */}
            <th>Time</th>
            <th>Justified</th>
            {/* <th>Actions</th>             */}
          </tr>
        </thead>
        <tbody>
          {filteredAbsences.map((absence) => (
            <tr key={absence.id}>
              <td>{absence.date}</td>
              {/* <td>{absence.namestagiaire}</td> */}
              <td>{absence.hours} - {parseInt(absence.hours)+2}</td>
              <td>{absence.justified ? 'Yes' : 'No'}</td>
              {/* <td>
                  <Link to={`/update-absence/${absence.id}`}><button>Edit</button></Link>
              </td> */}
            </tr>
          ))}
        </tbody>
                </table>
            )}
            
    </div>
  );
};

export default AbsenceStagiaire;
