import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {updateStagiaire, setStagiaires} from '../../actions/stagiaireActions'
// import { useNavigate } from "react-router-dom";
// import { useState } from "react"
import axios from "axios";

import { Link } from "react-router-dom";
function UpdateStagiaire() {

    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchStagiaire = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/stagiaires/${id}`);
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching Stagiaire:', error);
            }
        };

        fetchStagiaire();
    }, [id]);

    const handleClick = async () => {
        try {
            const updatedStagiaire = { id, name, email };
            console.log(updatedStagiaire);
            await axios.put(`http://localhost:8001/stagiaires/${id}`, updatedStagiaire);
            
            // Dispatch updateStagiaire with the updated Stagiaire data
            dispatch(updateStagiaire(updatedStagiaire));
            
            // Fetch updated Stagiaires from the server
            const updatedStagiairesResponse = await axios.get("http://localhost:8001/stagiaires");
            dispatch(setStagiaires(updatedStagiairesResponse.data));
            
        } catch (error) {
            console.error('Error updating Stagiaire:', error);
        }
    }
    return (
        <form>
            <Link to="/">Cancel</Link> <br/>
            <label>Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            <label>Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button onClick={handleClick}>Enregistrer</button>
        </form>
    )
}
export default UpdateStagiaire