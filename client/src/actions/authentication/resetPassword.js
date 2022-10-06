import {
    USER_RESET_PASSWORD_LOADING,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAILED,
    RESET_ALL_ALERTS
} from '../types';
import api from '../../utils/api'

export const resetPassword = (passwordResetCode, newPassword, confirmPassword) => async dispatch => {
    dispatch({
      type: RESET_ALL_ALERTS
    })
    dispatch({
      type: USER_RESET_PASSWORD_LOADING
    })
    const body = {passwordResetCode, newPassword};
    if(newPassword !== confirmPassword){
      dispatch({
        type: USER_RESET_PASSWORD_FAILED,
        payload: {
          errors: [{
            param: 'confirmPassword',
            msg: 'Passwords must match'}]
        }
      })
      return;
    }
    try {
      const res = await api.post('/auth/reset-password', body);
      dispatch({
        type: USER_RESET_PASSWORD_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if(errors){
        dispatch({
          type: USER_RESET_PASSWORD_FAILED,
          payload: err.response.data
        });
      }
    }
  }