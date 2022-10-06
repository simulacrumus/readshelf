import {
    USER_REGISTER_LOADING,
    USER_REGISTER_FAILED,
    USER_REGISTER_SUCCESS,
    RESET_ALL_ALERTS
} from '../types';
import api from '../../utils/api'
import { loadUser } from '../user/loadUser';

export const signup = formData => async dispatch => {
    dispatch({
      type: RESET_ALL_ALERTS
    })
    dispatch({
      type: USER_REGISTER_LOADING
    })
    try {
      const {password, confirmPassword} = formData
  
      if(password !== confirmPassword){
        dispatch({
          type: USER_REGISTER_FAILED,
          payload: {
            errors: [{
              param: 'confirmPassword',
              msg: 'Passwords must match'}]
          }
        })
        return;
      }
      const res = await api.post('/auth/register', formData);
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        dispatch({
          type: USER_REGISTER_FAILED,
          payload: err.response.data
        })
      }
    }
  };