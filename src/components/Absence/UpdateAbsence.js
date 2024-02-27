import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {fetchAbsence, updateExistingAbsence, fetchAbsences} from '../../actions/absenceActions'
import { fetchStagiaires} from '../../actions/stagiaireActions';

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UpdateAbsence() {

    const { id } = useParams();
    const [idstagiaire, setIdStagiaire] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [hours, setHours] = useState('');
    const [justified, setJustified] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const absence = useSelector(state => state.absences.absence);

    useEffect(() => {
        dispatch(fetchAbsence(id));
    }, [dispatch, id]);
    // console.log(absence);
    const stagiaires = useSelector(state => state.stagiaires.stagiaires);
  useEffect(() => {
      dispatch(fetchStagiaires());
      }, [dispatch]);


      const absences = useSelector(state => state.absences.absences);
  useEffect(() => {
    dispatch(fetchAbsences());
    }, [dispatch]);


        const mapAbsencesWithStagiaires = () => {
    return absences.map(absence => {
      const stagiaire = stagiaires.find(stagiaire => stagiaire.id === absence.idstagiaire);
      return {
        ...absence,
        namestagiaire: stagiaire ? stagiaire.name : '',
        email: stagiaire ? stagiaire.email : ''
      };
    });
  };

  const absencesWithStagiaires = mapAbsencesWithStagiaires();
  console.log(absencesWithStagiaires);
  // const getid = (name) => {
  //   return absencesWithStagiaires.find(stagiaire=>stagiaire.name === name).id;
  // }

    useEffect(() => {
        if (absence) {
            setName('');
            setIdStagiaire(absence.idstagiaire)
            setDate(absence.date);
            setHours(absence.hours);
            setJustified(absence.justified);
        }
    }, [absence]);
    console.log("gg",idstagiaire)
    const handleClick = async () => {
        try {
            const updatedAbsence = { id, idstagiaire, name, date, hours, justified};
             dispatch(updateExistingAbsence(id, updatedAbsence));
             navigate('/absences');

        } catch (error) {
            console.error('Error updating absence:', error);
        }
    };
    // useEffect(() => {
    //     const fetchAbsence = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8001/absences/${id}`);
    //             setName(response.data.name);
    //             setDate(response.data.date);
    //             setHours(response.data.hours);
    //             setJustified(response.data.justified);
    //         } catch (error) {
    //             console.error('Error fetching Absence:', error);
    //         }
    //     };

    //     fetchAbsence();
    // }, [id]);

    // const handleClick = async () => {
    //     try {
    //         const updatedAbsence = { id, name, date, hours, justified };
    //         console.log(updatedAbsence);
    //         await axios.put(`http://localhost:8001/absences/${id}`, updatedAbsence);
            
    //         // Dispatch updateAbsence with the updated Absence data
    //         dispatch(updateAbsence(updatedAbsence));
            
    //         // Fetch updated Absences from the server
    //         const updatedAbsencesResponse = await axios.get("http://localhost:8001/absences");
    //         dispatch(setAbsences(updatedAbsencesResponse.data));
            
    //     } catch (error) {
    //         console.error('Error updating Absence:', error);
    //     }
    // }
    return (
        <form style={{  width:"400px"}}>
            <Link to="/absences">Go back to absence list</Link> <br/>

            {/* {id} */}
            {/* {idstagiaire} */}
            {/* <label>Id</label>
            <input type="text" value={id} onChange={(e)=>setId(e.target.value)} />  */}
            {/* <label for="Id"></label>
              <select class="form-control" name="" id="" onChange={(e)=>setIdStagiaire(e.target.value)}>
                {
                    // <option  value={idstagiaire}>{idstagiaire}</option>

                stagiaires.map((stagiaire, index) => (
                    <option key={index} value={stagiaire.id}>{stagiaire.id} - {stagiaire.name}</option>
                ))
                }
                
                
              </select> */}
              <label for="Id">Id stagiaire</label>
            <div style={{ display: 'flex', marginLeft:"0px", alignItems: "center" , width:"max"}}>
                <input style={{  marginRight:"0px"}} type="number" value={idstagiaire} onChange={(e)=>setIdStagiaire(e.target.value)} />
                <select style={{  marginLeft:"0px", height: "48px"}} class="form-control" name="" id="" value={idstagiaire} onChange={(e)=>setIdStagiaire(e.target.value)}>
                  {idstagiaire?"":<option  value={idstagiaire}>--chooser stagiaire--</option>}
                    {stagiaires.map((stagiaire, index) => (
                        <option key={index} value={stagiaire.id}>{stagiaire.id} - {stagiaire.name}</option>
                    ))}
                </select>
            </div>
              
            {/* <label>Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  readOnly /> */}
            <label>Date</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
            <label>Hours</label>
            {/* <input type="number" value={hours} onChange={(e)=>setHours(e.target.value)} /> */}

            <div style={{ display: 'flex', marginLeft:"0px", alignItems: "center" , width:"max"}}>
                <select style={{  marginLeft:"0px", height: "48px"}} class="form-control" name="" id="" value={hours} onChange={(e)=>setHours(parseInt(e.target.value))}>
                  <option   >--chooser time--</option>
                  <option value={8}>8:00-10:00</option>
                  <option value={10}>10:00-12:00</option>
                  <option value={14}>14:00-16:00</option>
                  <option value={16}>16:00-18:00</option>  
                </select>
            </div>
            <label>Justified</label>
            <input type="checkbox" checked={justified} onChange={(e)=>setJustified(e.target.checked)} />
            <button onClick={handleClick}>Enregistrer</button>
        </form>
    )
}
export default UpdateAbsence