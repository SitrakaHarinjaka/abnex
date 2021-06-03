import { ActionTypes } from '../constants/action-types';

export const setCars = (cars) => {
  return {
    type: ActionTypes.SET_CARS,
    payload: cars,
  };
};

export const selectedCars = (car) => {
  return {
    type: ActionTypes.SELECTED_CARS,
    payload: car,
  };
};

export const getComments = comments =>{  
  return{
    type: ActionTypes.GET_COMMENTS,
    payload: comments
  };
}
