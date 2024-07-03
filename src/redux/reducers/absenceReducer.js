import {
  ADD_ABSENCE,
  DELETE_ABSENCE,
  UPDATE_ABSENCE,
  SET_ABSENCES,
  SET_ABSENCE,
} from "../actions/absenceActions";

const initialState = {
  absences: [],
};

const absenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ABSENCES:
      return { ...state, absences: action.payload };
    case SET_ABSENCE:
      return {
        ...state, absence: action.payload};
    case ADD_ABSENCE:
      return { ...state, absences: [...state.absences, action.payload] };
    case DELETE_ABSENCE:
      console.log("Deleting absence with id:", action.payload);
      return {
        ...state,
        absences: [
          ...state.absences.filter((absence) => absence.id !== action.payload),
        ],
      };
    // return state.absences.filter((absence)=>absence.id!==action.payload)

    case UPDATE_ABSENCE:
      return state.map((absence) =>
        absence.id === action.payload.id
          ? action.payload.updatedAbsence
          : absence
      );
    default:
      return state;
  }
};

export default absenceReducer;
