
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {deleteStagiaire} from '../../actions/stagiaireActions'
// import { setStagiaires } from '../../actions/stagiaireActions'
import axios from "axios";
// import { fetchStagiaires, removeStagiaire } from '../../actions/stagiaireActions';

function StagiaireList() {
    //filter
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const handleNameChange = (e) => {
        setNameFilter(e.target.value);
      };
    const handleIdChange = (e) => {
        setIdFilter(e.target.value);
      };
    const handleReset = () => {
        setNameFilter('');
        setIdFilter('');
      };
    



     const [stagiaires, setStagiaires] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchStagiaires = async () => {
            try {
                // console.log("response.data");

                const response = await axios.get("http://localhost:8001/stagiaires");
                dispatch(setStagiaires(response.data));
                // console.log(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchStagiaires();
    }, [dispatch]);
//      const stagiaires = useSelector(state => state.stagiaires);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchStagiaires());
//     console.logs(stagiaires)
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(removeStagiaire(id));
//   };

    const handleDelete = async(id) => {
        // console.log("Deleting stagiaire with id:", id);
        // dispatch(deleteStagiaire(id))
        try {
            await axios.delete(`http://localhost:8001/stagiaires/${id}`);
            // If the request is successful, you can dispatch an action to update the state in Redux
            dispatch(deleteStagiaire(id));
            const updatedStagiairesResponse = await axios.get("http://localhost:8001/stagiaires");
            dispatch(setStagiaires(updatedStagiairesResponse.data));
        } catch (error) {
            console.error('Error deleting stagiaire:', error);
            // Handle any errors that occur during the delete operation
        }
    }
    
    
    const filteredStagiaires = stagiaires.filter((stagiaire) => {
        return (
          stagiaire.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          (idFilter === '' || stagiaire.id === idFilter)
        );
      });
    
    
    return (
//         <div className="card-container">
//     {
        
//     stagiaires.map((stagiaire, index) => {
//         return (
//             <div className="card" key={index}>
//                 {/* <img src="img.jpg" alt="stagiaire Image" /> */}
//                 <div className="card-content">
//                     <p><strong>ID:</strong> {stagiaire.id}</p>
//                     <p><strong>Name:</strong> {stagiaire.name}</p>
//                     <p><strong>Email:</strong> {stagiaire.email}</p>
//                     <div>
//                     <Link to={`/update-stagiaire/${stagiaire.id}`}> <button>Edit</button></Link>
//                         <button onClick={() => handleDelete(stagiaire.id)}>Delete</button>
//                     </div>
//                 </div>
//             </div>
//         )
//     })}
// </div>
<div className="card-container">
<label htmlFor="nameFilter">Search by Name:</label>
      <input
        type="text"
        id="nameFilter"
        value={nameFilter}
        onChange={handleNameChange}
      />
      <label htmlFor="idFilter">Search by id:</label>
      <input
        type="text"
        id="idFilter"
        value={idFilter}
        onChange={handleIdChange}
      />
      <button onClick={handleReset}>Reset</button>
      <Link to="/stagiaires/add"><button >Add stagiaire</button></Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {/* {console.log("test")} */}
                {console.log(stagiaires)}


                <tbody>
                    {filteredStagiaires.map((stagiaire, index) => (
                        <tr key={index}>
                            <td>{stagiaire.id}</td>
                            <td>{stagiaire.name}</td>
                            <td>{stagiaire.email}</td>
                            <td>
                                <Link to={`/update-stagiaire/${stagiaire.id}`}><button>Edit</button></Link>
                                <button onClick={() => handleDelete(stagiaire.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       
    )
}
export default StagiaireList
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { deleteStagiaire, setStagiaires } from '../../actions/stagiaireActions';
// import axios from "axios";

// function StagiaireList() {
//     const [nameFilter, setNameFilter] = useState('');
//     const [idFilter, setIdFilter] = useState('');

//     const filteredStagiaires = useSelector(state => state.stagiaires.filter((stagiaire) => {
//         return (
//           stagiaire.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
//           (idFilter === '' || stagiaire.id === idFilter)
//         );
//       }));

//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchStagiaires = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8001/stagiaires");
//                 dispatch(setStagiaires(response.data));
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchStagiaires();
//     }, [dispatch]);

//     const handleDelete = async(id) => {
//         try {
//             await axios.delete(`http://localhost:8001/stagiaires/${id}`);
//             dispatch(deleteStagiaire(id));
//         } catch (error) {
//             console.error('Error deleting stagiaire:', error);
//         }
//     }
    
//     return (
//         <div className="card-container">
//             <label htmlFor="nameFilter">Search by Name:</label>
//             <input
//                 type="text"
//                 id="nameFilter"
//                 value={nameFilter}
//                 onChange={(e) => setNameFilter(e.target.value)}
//             />
//             <label htmlFor="idFilter">Search by id:</label>
//             <input
//                 type="text"
//                 id="idFilter"
//                 value={idFilter}
//                 onChange={(e) => setIdFilter(e.target.value)}
//             />
//             <button onClick={() => { setNameFilter(''); setIdFilter(''); }}>Reset</button>
//             <Link to="/stagiaires/add"><button >Add stagiaire</button></Link>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredStagiaires.map((stagiaire, index) => (
//                         <tr key={index}>
//                             <td>{stagiaire.id}</td>
//                             <td>{stagiaire.name}</td>
//                             <td>{stagiaire.email}</td>
//                             <td>
//                                 <Link to={`/update-stagiaire/${stagiaire.id}`}><button>Edit</button></Link>
//                                 <button onClick={() => handleDelete(stagiaire.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }
// export default StagiaireList;
