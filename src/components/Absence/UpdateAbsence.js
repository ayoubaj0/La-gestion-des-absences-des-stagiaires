import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {updateAbsence, setAbsences} from '../../actions/absenceActions'
import { useNavigate } from "react-router-dom";
// import { useState } from "react"
import axios from "axios";

import { Link } from "react-router-dom";
function UpdateAbsence() {

    const { id } = useParams();
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [hours, setHours] = useState('');
    const [justified, setJustified] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAbsence = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/absences/${id}`);
                setName(response.data.name);
                setDate(response.data.date);
                setHours(response.data.hours);
                setJustified(response.data.justified);
            } catch (error) {
                console.error('Error fetching Absence:', error);
            }
        };

        fetchAbsence();
    }, [id]);

    const handleClick = async () => {
        try {
            const updatedAbsence = { id, name, date, hours, justified };
            console.log(updatedAbsence);
            await axios.put(`http://localhost:8001/absences/${id}`, updatedAbsence);
            
            // Dispatch updateAbsence with the updated Absence data
            dispatch(updateAbsence(updatedAbsence));
            
            // Fetch updated Absences from the server
            const updatedAbsencesResponse = await axios.get("http://localhost:8001/absences");
            dispatch(setAbsences(updatedAbsencesResponse.data));
            
        } catch (error) {
            console.error('Error updating Absence:', error);
        }
    }
    return (
        <form>
            <Link to="/">Cancel</Link> <br/>
            {/* <label>Id</label>
            <input type="text" value={id} onChange={(e)=>setId(e.target.value)} />  */}
            <label>Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            <label>Date</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
            <label>Hours</label>
            <input type="number" value={hours} onChange={(e)=>setHours(e.target.value)} />
            <label>Justified</label>
            <input type="checkbox" checked={justified} onChange={(e)=>setJustified(e.target.value)} />
            <button onClick={handleClick}>Enregistrer</button>
        </form>
    )
}
export default UpdateAbsence