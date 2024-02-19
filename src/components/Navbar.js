// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/absencesparstagiaires">Absences par stagiaires</Link>
        </li>
        <li>
          <Link to="/absences">Gestions des Absences</Link>
        </li>
        <li>
          <Link to="/stagiaires">Gestions des Stagiaires</Link>
        </li>
        {/* <li>
          <Link to="/stagiaires/add">Add Stagiaire</Link>
        </li>
        
        <li>
          <Link to="/absences/add">Add Absence</Link>
        </li> */}
        
      </ul>
    </nav>
  );
};

export default Navbar;
