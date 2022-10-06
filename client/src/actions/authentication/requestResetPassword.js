import {
    AUTH_REQUEST_RESET_PASSWORD_SUCCESS,
    AUTH_REQUEST_RESET_PASSWORD_FAILED,
    RESET_ALL_ALERTS
} from '../types';
import api from '../../utils/api'

export const requestResetPassword = (email) => async dispatch => {
    dispatch({
      type: RESET_ALL_ALERTS
    })
    const body = {email};
    try {
      const res = await api.put('/auth/request-reset-password', body);
      dispatch({
        type: AUTH_REQUEST_RESET_PASSWORD_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if(errors){
        dispatch({
          type: AUTH_REQUEST_RESET_PASSWORD_FAILED,
          payload: err.response.data
        });
      }
    }
  };