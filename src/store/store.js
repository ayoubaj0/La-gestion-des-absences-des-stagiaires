// import { createStore, combineReducers } from 'redux';
// import stagiaireReducer from '../reducers/stagiaireReducer';
// import absenceReducer from '../reducers/absenceReducer';

// const rootReducer = combineReducers({
//   stagiaires: stagiaireReducer,
//   absences: absenceReducer
// });

// const store = createStore(rootReducer);

// export default store;
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import stagiaireReducer from '../reducers/stagiaireReducer';
import absenceReducer from '../reducers/absenceReducer';

const rootReducer = combineReducers({
  stagiaires: stagiaireReducer,
  absences: absenceReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Apply the thunk middleware

export default store;
