// Stagiaire Action Types
export const SET_ABSENCES = 'SET_ABSENCES';
export const ADD_ABSENCE = 'ADD_ABSENCE';
export const DELETE_ABSENCE = 'DELETE_ABSENCE';
export const UPDATE_ABSENCE = 'UPDATE_ABSENCE';

// Stagiaire Action Creators
export const setAbsences = (absences) => {
    return {
      type: SET_ABSENCES,
      payload: absences,
    };
  };
export const addAbsence = (absence) => {
  return {
    type: ADD_ABSENCE,
    payload: absence
  };
};

export const deleteAbsence = (id) => {
  return {
    type: DELETE_ABSENCE,
    payload: id
  };
};

export const updateAbsence = (id, updatedAbsence) => {
  return {
    type: UPDATE_ABSENCE,
    payload: { id, updatedAbsence }
  };
};
