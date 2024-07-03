import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import stagiaireReducer from "../reducers/stagiaireReducer";
import absenceReducer from "../reducers/absenceReducer";

const rootReducer = combineReducers({
  stagiaires: stagiaireReducer,
  absences: absenceReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk)); 
export default store;
