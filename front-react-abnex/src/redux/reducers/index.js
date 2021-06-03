import { combineReducers } from 'redux';
import { carReducer, selectedCarReducer, logUser , signinUSer, getComments, setUserConnected} from './carReducer';


const reducers = combineReducers({
  allCars: carReducer,
  car: selectedCarReducer,
  isLogged: logUser,
  signUser: signinUSer,
  comments: getComments, 
  userConnected : setUserConnected
});

export default reducers;
