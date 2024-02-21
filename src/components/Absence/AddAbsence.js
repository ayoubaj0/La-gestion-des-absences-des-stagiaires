import { useState , useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import {addNewAbsence} from '../../actions/absenceActions'
import { useNavigate } from "react-router-dom";
import { fetchStagiaires} from '../../actions/stagiaireActions';

import { Link } from "react-router-dom";


function AddAbsence() {
    const [id, setId] = useState();
    const [idstagiaire, setIdStagiaire] = useState("");
    // const [name, setName] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [hours, setHours] = useState('');
    const [justified, setJustified] = useState(false);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = () => {
        const newAbsence = { id, idstagiaire, date, hours, justified};
        dispatch(addNewAbsence(newAbsence));
        setId('');
        setIdStagiaire("");
        // setName('');
        setDate('');
        setHours('');
        setJustified('');
        navigate('/absences');
    }
    const stagiaires = useSelector(state => state.stagiaires.stagiaires);
  useEffect(() => {
      dispatch(fetchStagiaires());
      }, [dispatch]);
    
    // const handleClick = async () => {
    //     try {
    //         // const currentDate = date ? date : new Date().toISOString().split('T')[0];
    //         const newAbsence = { id, name, date, hours, justified };
    //         // console.log(newAbsence);
    //         const response = await axios.post("http://localhost:8001/absences", newAbsence);           
    //         // Dispatch addAbsenceAction with the newly added Absence
    //         dispatch(addAbsence(response.data));           
    //         // Fetch updated Absences from the server
    //         const updatedAbsencesResponse = await axios.get("http://localhost:8001/absences");
    //         dispatch(setAbsences(updatedAbsencesResponse.data));
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Error adding Absence:', error);
    //     }
    // }
    return (
        <form>
            <Link to="/">Cancel</Link> <br/>
            {/* <label>Id</label>
            <input type="text" value={id} onChange={(e)=>setId(e.target.value)} />
            {id}
              <label>Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            <label>Date</label> */}
            <label for="Id">Id stagiaire</label>
            <div style={{ display: 'flex', marginLeft:"0px", alignItems: "center"}}>
                <input style={{  marginRight:"0px"}} type="number" value={idstagiaire} onChange={(e)=>setIdStagiaire(e.target.value)} />
                <select style={{  marginLeft:"0px", height: "48px"}} class="form-control" name="" id="" value={idstagiaire} onChange={(e)=>setIdStagiaire(e.target.value)}>
                  {idstagiaire?"":<option  value={idstagiaire}>--chooser stagiaire--</option>}
                    {stagiaires.map((stagiaire, index) => (
                        <option key={index} value={stagiaire.id}>{stagiaire.id} - {stagiaire.name}</option>
                    ))}
                </select>
            </div>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
            <label>Hours</label>
            <input type="number" value={hours} onChange={(e)=>setHours(parseInt(e.target.value))} />
            <label>Justified</label>
            <input type="checkbox" checked={justified} onChange={(e) => setJustified(e.target.checked)} />
            <button onClick={handleClick}>Enregistrer</button>
        </form>
    )
}
export default AddAbsence