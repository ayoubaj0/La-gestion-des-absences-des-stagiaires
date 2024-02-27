import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={{ width: '100%', overflow: 'hidden', marginTop:"0px" ,  }} className="container">
    <nav style={{ width: '84%', float:'right' , marginTop:"0px", backgroundColor:"#28324f"}} className="">
      <ul className='topnav' style={{backgroundColor:"#28324f"}} >
        <li><a></a></li>
        <li>
          <Link to="/absencesparstagiaires ">Absences par stagiaires</Link>
        </li>
        <li>
          <Link to="/absences">Gestions des Absences</Link>
        </li>
        <li>
          <Link to="/stagiaires">Gestions des Stagiaires</Link>
        </li>
        
        
      </ul>
    </nav>
    {/*b9d7ea/ d6e6ff / b9d7ea/ #bfd8d5*/}
    <div class="vertical-nav " style={{backgroundColor:"#28324f"}} id="sidebar">
    <div class="py-2 px-1 mb-2 " style={{backgroundColor:"#28324f"}}>
      <div class="media d-flex align-items-center"><img src="logo192.png" alt="..." width="65" class="mr-1 rounded-circle img-thumbnail shadow-sm"/>
        <div class="media-body">
          <h4 class="m-0 text-light">Ayoub Ajermoun</h4>
          <p class="font-weight-light text-white mb-0">Projet</p>
        </div>
      </div>
    </div>
    <ul class="nav flex-column  mb-0" style={{backgroundColor:"#28324f"}}>
    <li class="nav-item">
        <Link to="/" class="nav-link  font-italic" style={{color:"#a7abb7"}}>
                  <i class="fa fa-th-large mr-3  fa-fw" ></i>
                  Home
              </Link>
      </li>
    </ul>
  
    <p class="text-info font-weight-bold text-uppercase px-3 small pt-4 pb-2 mb-0 border-bottom" > <i class="fa fa-bar-chart" aria-hidden="true"></i>statistiques absence </p>
  
    <ul class="nav flex-column  mb-0" style={{backgroundColor:"#28324f"}}>


    {/* <li class="nav-item">


<div class='dashboard-nav-dropdown nav-link  font-italic' style={{color:"#a7abb7"}}><Link to="/absences" class="dashboard-nav-item dashboard-nav-dropdown-toggle nav-link  font-italic" style={{color:"#a7abb7"}}>  
<i class="fa fa-pie-chart mr-1  fa-fw">
  </i>Gestion Des absences</Link>
                  <div class='dashboard-nav-dropdown-menu'>
               <Link to="/absencesparstagiaires " class="nav-link  font-italic" style={{color:"#a7abb7"}}> <i class="fa fa-pie-chart mr-3  fa-fw"></i>Absences par stagiaires</Link> 
              <a href="/absences#table-absences" class="nav-link  font-italic" style={{color:"#a7abb7"}}>table-absences</a>
                          </div>
              </div>
    </li> */}

     
      <li class="nav-item">
              <Link to="/absencesparstagiaires " class="nav-link  font-italic" style={{color:"#a7abb7"}} > <i class="fa fa-pie-chart mr-3  fa-fw"></i>Absences par stagiaires</Link>
      </li>
      </ul>
    <p class="text-info font-weight-bold text-uppercase px-3 small pt-4 pb-2 mb-0 border-bottom "> <i class="fa fa-sliders" aria-hidden="true"></i> Gestions des Stagiaires </p>

    <ul class="nav flex-column  mb-0 " style={{backgroundColor:"#28324f"}}>
      <li class="nav-item">
              <Link to="/stagiaires" class="nav-link  font-italic" style={{color:"#a7abb7"}} ><i class="fa fa-address-card mr-3  fa-fw"></i> Liste des Stagiaires</Link>
      </li>
      <li class="nav-item">
              <Link to="/stagiaires/add" class="nav-link  font-italic" style={{color:"#a7abb7"}}> <i class="fa fa-user-plus mr-3  fa-fw"></i> Ajouter Stagiaire</Link>
      </li>
    </ul>
    <p class="text-info font-weight-bold text-uppercase px-3 small pt-4 pb-2 mb-0 border-bottom" > <i class="fa fa-sliders" aria-hidden="true"></i> Gestions des Absences  </p>
      <ul class="nav flex-column  mb-0" style={{backgroundColor:"#28324f"}}>
      <li class="nav-item">
              <Link to="/absences" class="nav-link  font-italic" style={{color:"#a7abb7"}}> <i class="fa fa-calendar mr-3  fa-fw"></i> Liste des Absences</Link>
      </li>
      <li class="nav-item" >
              <Link to="/absences/add"  class="nav-link  font-italic" style={{color:"#a7abb7"}} ><i class="fa fa-calendar-plus-o mr-3  fa-fw"></i> Ajouter Absence</Link>
      </li>
    </ul>
  </div>
  {/* <div class="page-content" id="content">
    <button id="sidebarCollapse" type="button" class="btn btn-dark  rounded-pill shadow-sm px-4 py-2 mt-4" style={{backgroundColor:"#333"}}>
      <i class="fa fa-bars mr-2"></i></button>
  </div> */}
    </div>
  );
};

export default Navbar;
