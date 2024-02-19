import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {addAbsence, setAbsences} from '../../actions/absenceActions'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

function AddAbsence() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [hours, setHours] = useState('');
    const [justified, setJustified] = useState(false);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleClick = async () => {
        try {
            // const currentDate = date ? date : new Date().toISOString().split('T')[0];
            const newAbsence = { id, name, date, hours, justified };
            // console.log(newAbsence);
            const response = await axios.post("http://localhost:8001/absences", newAbsence);
            
            // Dispatch addAbsenceAction with the newly added Absence
            dispatch(addAbsence(response.data));
            
            // Fetch updated Absences from the server
            const updatedAbsencesResponse = await axios.get("http://localhost:8001/absences");
            dispatch(setAbsences(updatedAbsencesResponse.data));
            
            navigate('/');
        } catch (error) {
            console.error('Error adding Absence:', error);
        }
    }
    return (
        <form>
            <Link to="/">Cancel</Link> <br/>
            <label>Id</label>
            <input type="text" value={id} onChange={(e)=>setId(e.target.value)} />
            <label>Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            <label>Date</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
            <label>Hours</label>
            <input type="number" value={hours} onChange={(e)=>setHours(parseInt(e.target.value))} />
            <label>Justified</label>
            {/* <input type="checkbox" checked={justified} onChange={(e)=>setJustified(e.target.value)} /> */}
            <input type="checkbox" checked={justified} onChange={(e) => setJustified(e.target.checked)} />

            <button onClick={handleClick}>Enregistrer</button>
        </form>
    )
}
export default AddAbsence