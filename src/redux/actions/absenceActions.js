import axios from "axios";
// Stagiaire Action Types
export const SET_ABSENCES = "SET_ABSENCES";
export const SET_ABSENCE = "SET_ABSENCE";
export const ADD_ABSENCE = "ADD_ABSENCE";
export const DELETE_ABSENCE = "DELETE_ABSENCE";
export const UPDATE_ABSENCE = "UPDATE_ABSENCE";

// Stagiaire Action Creators
export const setAbsences = (absences) => {
  return {
    type: SET_ABSENCES,
    payload: absences,
  };
};
export const setAbsence = (absence) => {
  return {
    type: SET_ABSENCE,
    payload: absence,
  };
};
export const addAbsence = (absence) => {
  return {
    type: ADD_ABSENCE,
    payload: absence,
  };
};

export const deleteAbsence = (id) => {
  return {
    type: DELETE_ABSENCE,
    payload: id,
  };
};

export const updateAbsence = (id, updatedAbsence) => {
  return {
    type: UPDATE_ABSENCE,
    payload: { id, updatedAbsence },
  };
};

export const fetchAbsences = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:8000/absences");
      dispatch(setAbsences(response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};
export const fetchAbsence = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8000/absences/${id}`);
      dispatch(setAbsence(response.data));
    } catch (error) {
      console.error("Error fetching Absence by id:", error);
    }
  };
};
export const removeAbsence = (id) => {
  return async (dispatch) => {
    try {
      console.log("test", id);
      await axios.delete(`http://localhost:8000/absences/${id}`);
      dispatch(deleteAbsence(id));
    } catch (error) {
      console.error("Error deleting Absences:", error);
    }
  };
};
export const addNewAbsence = (newAbsence) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/absences",
        newAbsence
      );
      dispatch(addAbsence(response.data));
    } catch (error) {
      console.error("Error adding new Absence:", error);
    }
  };
};
export const updateExistingAbsence = (id, updatedAbsence) => {
  return async (dispatch) => {
    try {
      await axios.put(`http://localhost:8000/absences/${id}`, updatedAbsence);
      dispatch(updateAbsence(id, updatedAbsence));
    } catch (error) {
      console.error("Error updating Absence:", error);
    }
  };
};
