import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStagiaire,
  updateExistingStagiaire,
} from "../../redux/actions/stagiaireActions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UpdateStagiaire() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateofbirth, setDateOfBirth] = useState("");
  const [filiere, setFiliere] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stagiaire = useSelector((state) => state.stagiaires.stagiaire);

  useEffect(() => {
    dispatch(fetchStagiaire(id));
  }, [dispatch, id]);
  console.log(stagiaire);

  useEffect(() => {
    if (stagiaire) {
      setName(stagiaire.name);
      setEmail(stagiaire.email);
      setDateOfBirth(stagiaire.dateofbirth);
      setFiliere(stagiaire.filiere);
    }
  }, [stagiaire]);

  const handleClick = async () => {
    try {
      const updatedStagiaire = { id, name, email, dateofbirth, filiere };
      dispatch(updateExistingStagiaire(id, updatedStagiaire));
      navigate("/stagiaires");
    } catch (error) {
      console.error("Error updating Stagiaire:", error);
    }
  };
 

  return (
    <form style={{ width: "400px" }}>
      <Link class=" primary" to="/stagiaires">
        Go back to stagiaires list
      </Link>{" "}
      <br />
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
        style={{ width: "400px" }}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button class="button primary save" onClick={handleClick}>
        Enregistrer
      </button>
    </form>
  );
}
export default UpdateStagiaire;
