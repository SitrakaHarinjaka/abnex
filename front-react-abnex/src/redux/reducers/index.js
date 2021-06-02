import { combineReducers } from 'redux';
import { carReducer , selectedCarReducer} from './carReducer';

const reducers = combineReducers({
  allCars: carReducer,
  car: selectedCarReducer
});

export default reducers;
