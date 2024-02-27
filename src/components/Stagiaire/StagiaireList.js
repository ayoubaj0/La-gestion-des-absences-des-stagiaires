
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { fetchStagiaires, removeStagiaire } from '../../actions/stagiaireActions';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


function StagiaireList() {

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
      const stagiaires = useSelector(state => state.stagiaires.stagiaires);
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(fetchStagiaires());
        console.log(stagiaires)
      }, [dispatch]);
      console.log(stagiaires);
    
      const handleDelete = (id) => {
        dispatch(removeStagiaire(id));
      };

      const filteredStagiaires = stagiaires.filter((stagiaire) => {
        return (
          stagiaire.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          (idFilter === '' || stagiaire.id === idFilter)
        );
      });

    //  const [stagiaires, setStagiaires] = useState([]);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     const fetchStagiaires = async () => {
    //         try {
    //             // console.log("response.data");

    //             const response = await axios.get("http://localhost:8001/stagiaires");
    //             dispatch(setStagiaires(response.data));
    //             // console.log(response);
    //         } catch (error) {
    //             console.error('Error fetching users:', error);
    //         }
    //     };

    //     fetchStagiaires();
    // }, [dispatch]);


    // const handleDelete = async(id) => {
    //     // console.log("Deleting stagiaire with id:", id);
    //     // dispatch(deleteStagiaire(id))
    //     try {
    //         await axios.delete(`http://localhost:8001/stagiaires/${id}`);
    //         // If the request is successful, you can dispatch an action to update the state in Redux
    //         dispatch(deleteStagiaire(id));
    //         const updatedStagiairesResponse = await axios.get("http://localhost:8001/stagiaires");
    //         dispatch(setStagiaires(updatedStagiairesResponse.data));
    //     } catch (error) {
    //         console.error('Error deleting stagiaire:', error);
    //         // Handle any errors that occur during the delete operation
    //     }
    // }
    
    
    
    
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
<div style={{ width: '74%', float:'right' }} className="card-container content">
<h3>Filter Stagiaire Liste : </h3>
    <div className="filter-container">
    <div class="form-row date-range">
      <div class="form-group ">
      <label for="nameFilter">Search by Name:</label>
      <input type="text" class="form-control" id="nameFilter" value={nameFilter} onChange={handleNameChange} />
    <button class="button primary cancel" onClick={handleReset}>Reset</button>

    </div>
    <div class="form-group ">
      <label for="idFilter">Search by id:</label>
      <input type="text" class="form-control" id="idFilter" value={idFilter} onChange={handleIdChange} />
    </div>
    </div>

    </div>

    
      <h2>Liste stagiaire : </h2>
      <Link to="/stagiaires/add"><button class="btn btn-primary new mb-3">Add stagiaire</button></Link>
      <br></br>
      <i class="fa fa-download btn btn-primary"  aria-hidden="true">
<ReactHTMLTableToExcel id="test-table-xls-button" className="btn btn-primary"  table="stagiaireTable" filename="stagiaires" sheet="stagiaires" buttonText="Export Table" />

</i>
            <table id="stagiaireTable" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {console.log(stagiaires)}
                <tbody>
                    {filteredStagiaires.map((stagiaire, index) => (
                        <tr key={index}>
                            <td>{stagiaire.id}</td>
                            <td>{stagiaire.name}</td>
                            <td>{stagiaire.email}</td>
                            <td>
                                <Link  to={`/update-stagiaire/${stagiaire.id}`}><button class="btn btn-primary edit">Edit</button></Link>
                                <button class="btn btn-danger delete ms-4" onClick={() => handleDelete(stagiaire.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       
    )
}
export default StagiaireList
