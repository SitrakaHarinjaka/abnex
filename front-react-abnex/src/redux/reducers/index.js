import { combineReducers } from 'redux';
import { carReducer } from './carReducer';

const reducers = combineReducers({
  allCars: carReducer,
});

export default reducers;
