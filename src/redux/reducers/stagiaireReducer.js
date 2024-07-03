import {
  ADD_STAGIAIRE,
  DELETE_STAGIAIRE,
  UPDATE_STAGIAIRE,
  SET_STAGIAIRES,
  SET_STAGIAIRE,
} from "../actions/stagiaireActions";

const initialState = {
  stagiaires: [],
};

const stagiaireReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STAGIAIRES:
      return { ...state, stagiaires: action.payload };
    case SET_STAGIAIRE:
      return {
        ...state,
        stagiaire: action.payload,
      };
    case ADD_STAGIAIRE:
      return { ...state, stagiaires: [...state.stagiaires, action.payload] };
    case DELETE_STAGIAIRE:
      console.log("Deleting stagiaire with id:", action.payload);
      return {
        ...state,
        stagiaires: [
          ...state.stagiaires.filter(
            (stagiaire) => stagiaire.id !== action.payload
          ),
        ],
      };
    case UPDATE_STAGIAIRE:
      return state.map((stagiaire) =>
        stagiaire.id === action.payload.id
          ? action.payload.updatedStagiaire
          : stagiaire
      );
    // case UPDATE_STAGIAIRE:
    //    return {
    //      ...state,
    //      stagiaires: state.stagiaires.map(stagiaire =>
    //        stagiaire.id === action.payload.id ? action.payload.updatedStagiaire : stagiaire
    //      )
    //    };
    default:
      return state;
  }
};

export default stagiaireReducer;
