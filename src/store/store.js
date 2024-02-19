import { createStore, combineReducers } from 'redux';
import stagiaireReducer from '../reducers/stagiaireReducer';
import absenceReducer from '../reducers/absenceReducer';

const rootReducer = combineReducers({
  stagiaires: stagiaireReducer,
  absences: absenceReducer
});

const store = createStore(rootReducer);

export default store;