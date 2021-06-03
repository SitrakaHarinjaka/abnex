import { combineReducers } from 'redux';
import { carReducer, selectedCarReducer, logUser , signinUSer, getComments} from './carReducer';


const reducers = combineReducers({
  allCars: carReducer,
  car: selectedCarReducer,
  isLogged: logUser,
  signUser: signinUSer,
  comments: getComments
});

export default reducers;
