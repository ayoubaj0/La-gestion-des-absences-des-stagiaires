// Stagiaire Action Types
// import axios from "axios";

export const SET_STAGIAIRES = 'SET_STAGIAIRES';
export const ADD_STAGIAIRE = 'ADD_STAGIAIRE';
export const DELETE_STAGIAIRE = 'DELETE_STAGIAIRE';
export const UPDATE_STAGIAIRE = 'UPDATE_STAGIAIRE';
export const SET_LOADING = 'SET_LOADING';
// Stagiaire Action Creators
export const setStagiaires = (stagiaires) => {
    return {
      type: SET_STAGIAIRES,
      payload: stagiaires,
    };
  };
export const addStagiaire = (stagiaire) => {
  return {
    type: ADD_STAGIAIRE,
    payload: stagiaire
  };
};

export const deleteStagiaire = (id) => {
  return {
    type: DELETE_STAGIAIRE,
    payload: id
  };
};

export const updateStagiaire = (id, updatedStagiaire) => {
  return {
    type: UPDATE_STAGIAIRE,
    payload: { id, updatedStagiaire }
  };
};
// export const fetchStagiaires = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get("http://localhost:8001/stagiaires");
//       dispatch(setStagiaires(response.data));
//     } catch (error) {
//       console.error('Error fetching stagiaires:', error);
//     }
//   };
// };

// export const removeStagiaire = (id) => {
//   return async (dispatch) => {
//     try {
//       await axios.delete(`http://localhost:8001/stagiaires/${id}`);
//       dispatch(deleteStagiaire(id));
//     } catch (error) {
//       console.error('Error deleting stagiaire:', error);
//     }
//   };
// };
