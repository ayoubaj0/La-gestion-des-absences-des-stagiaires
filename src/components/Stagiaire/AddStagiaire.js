import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  fetchStagiaires,
  addNewStagiaire,
} from "../../redux/actions/stagiaireActions";

function AddStagiaire() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateofbirth, setDateOfBirth] = useState("");
  const [filiere, setFiliere] = useState("");

  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    const newStagiaire = { id, name, email, dateofbirth, filiere };
    dispatch(addNewStagiaire(newStagiaire));
    setId("");
    setName("");
    setEmail("");
    setDateOfBirth("");
    setFiliere("");
    navigate("/stagiaires");
  };
  const stagiaires = useSelector((state) => state.stagiaires.stagiaires);

  useEffect(() => {
    dispatch(fetchStagiaires());

    const ids = stagiaires.map((stagiaire) => stagiaire.id);
    const newId = String(Math.max(...ids)+1);
    setId(newId);
  }, [dispatch]);

  console.log("stagiaires", stagiaires);


  return (
    <form style={{ width: "400px" }}>
      {/* {console.log("ff",stagiaires)} */}
      <Link class=" primary" to="/stagiaires">
        Go back to stagiaires list
      </Link>{" "}
      <br />
      <label>Id stagiaire</label>
      <input
        style={{ width: "400px" }}
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        readOnly
      />
      <label>Name</label>
      <input
        style={{ width: "400px" }}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>date_of_birth : </label>
      <input
        style={{ width: "400px" }}
        type="date"
        value={dateofbirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
      />
      <label>Filiere :</label>
      <div
        style={{
          display: "flex",
          marginLeft: "0px",
          alignItems: "center",
          width: "400px",
        }}
      >
        <select
          style={{ marginLeft: "0px", height: "48px" }}
          class="form-control"
          name=""
          id=""
          value={filiere}
          onChange={(e) => setFiliere(e.target.value)}
        >
          <option>--choose filiere--</option>
          <option value={"Développement Digital"}>Développement Digital</option>
          <option value={"Gestion des Entreprises"}>Gestion des Entreprises</option>
          <option value={"Génie Civil"}>Génie Civil</option>
        </select>
      </div>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button class="button primary save" onClick={handleClick}>
        Enregistrer
      </button>
      {/* {console.log({id,name,email})} */}
    </form>
  );
}
export default AddStagiaire;
