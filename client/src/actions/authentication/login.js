import {
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    RESET_ALL_ALERTS
} from '../types';
import api from '../../utils/api'
import { loadUser } from '../user/loadUser';

export const login = (email, password) => async dispatch => {
    const body = { email, password };
    dispatch({
      type: RESET_ALL_ALERTS
    })
    dispatch({
      type: USER_LOGIN_LOADING
    })
    try {
      const res = await api.post('/auth/login', body);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if(errors){
        dispatch({
          type: USER_LOGIN_FAILED,
          payload: err.response.data
        });
      }
    }
};