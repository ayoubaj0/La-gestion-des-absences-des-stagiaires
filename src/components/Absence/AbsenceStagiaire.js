import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { fetchStagiaires} from '../../actions/stagiaireActions';
import { fetchAbsences } from '../../actions/absenceActions';
import { Link } from "react-router-dom"


function AbsenceStagiaire() {
  const [showTable, setShowTable] = useState(false); // State variable to manage table visibility

    

  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [fromDateFilter, setFromDateFilter] = useState('');
  const [toDateFilter, setToDateFilter] = useState('');

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
  
    // Group absences by stagiaire id and calculate total, justified, and not justified hours
    filteredAbsences.forEach((absence) => {
      const { idstagiaire, namestagiaire, hours, justified } = absence;
  
      // If the idstagiaire doesn't exist in absencesById, initialize it
      if (!absencesById[idstagiaire]) {
        absencesById[idstagiaire] = {
          idstg: idstagiaire,
          namestg: namestagiaire,
          totalHours: 0,
          justifiedHours: 0,
          notJustifiedHours: 0,
        };
      }
  
      // Update total hours and justified/not justified hours
      absencesById[idstagiaire].totalHours += hours;
      if (justified) {
        absencesById[idstagiaire].justifiedHours += hours;
      } else {
        absencesById[idstagiaire].notJustifiedHours += hours;
      }
    });
  
    // Filter out any undefined elements in the array
    return absencesById.filter(Boolean);
  };
  
  const absencesByStagiaire = groupAbsencesById();
  console.log("absencesByStagiaire",absencesByStagiaire)
  
 
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
                  <button onClick={() => toggleTable(absence.namestg)}>{showTable ? "Hide Details" : "Show Details"}</button>
            
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
            <th>Hours</th>
            <th>Justified</th>
            {/* <th>Actions</th>             */}
          </tr>
        </thead>
        <tbody>
          {filteredAbsences.map((absence) => (
            <tr key={absence.id}>
              <td>{absence.date}</td>
              {/* <td>{absence.namestagiaire}</td> */}
              <td>{absence.hours}</td>
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
