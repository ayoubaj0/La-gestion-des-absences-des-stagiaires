import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {addStagiaire, setStagiaires} from '../../actions/stagiaireActions'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

function AddStagiaire() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleClick = async () => {
        try {
            const newStagiaire = { id, name, email };
            // console.log(newStagiaire);
            const response = await axios.post("http://localhost:8001/stagiaires", newStagiaire);
            
            // Dispatch addStagiaireAction with the newly added Stagiaire
            dispatch(addStagiaire(response.data));
            
            // Fetch updated Stagiaires from the server
            const updatedStagiairesResponse = await axios.get("http://localhost:8001/stagiaires");
            dispatch(setStagiaires(updatedStagiairesResponse.data));
            
            navigate('/');
        } catch (error) {
            console.error('Error adding Stagiaire:', error);
        }
    }
    return (
        <form>
            <Link to="/stagiaires">Go back to Stagiaire list</Link> <br/>
            <label>Id</label>
            <input type="text" value={id} onChange={(e)=>setId(e.target.value)} />
            <label>Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            <label>Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button onClick={handleClick}>Enregistrer</button>
            {/* {console.log({id,name,email})} */}
        </form>
    )
}
export default AddStagiaire