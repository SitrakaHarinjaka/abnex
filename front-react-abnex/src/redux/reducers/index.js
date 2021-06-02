import { combineReducers } from 'redux';
import { carReducer, selectedCarReducer, logUser , signinUSer} from './carReducer';


const reducers = combineReducers({
  allCars: carReducer,
  car: selectedCarReducer,
  isLogged: logUser,
  signUser: signinUSer
});

export default reducers;
