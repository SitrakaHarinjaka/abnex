import { ActionTypes } from '../constants/action-types';

const initialState = {
  cars: [],
};
export const carReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CARS:
      return { ...state, cars: payload };
    default:
      return state;
  }
};
