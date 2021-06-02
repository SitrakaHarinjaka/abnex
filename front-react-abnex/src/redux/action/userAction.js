import { ActionTypes } from '../constants/action-types';

export const setLogin = (userObj) => {
  return {
    type: ActionTypes.LOG_USER,
    payload: userObj,
  };
};

export const setSignin = newUser =>{
  return{
    type: ActionTypes.SIGNIN_USER,
    payload: newUser
  }
}
