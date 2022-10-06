import {
    USER_CHANGE_PASSWORD_LOADING,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_CHANGE_PASSWORD_FAILED,
    RESET_ALL_ALERTS
} from '../types';
import api from '../../utils/api'

export const updatePassword = (email, currentPassword, newPassword) => async dispatch => {
    dispatch({
      type: RESET_ALL_ALERTS
    })
    dispatch({
      type: USER_CHANGE_PASSWORD_LOADING
    })
    try {
      const body = {email,currentPassword, newPassword};
      const res = await api.post('/user/password', body);
      dispatch({
        type: USER_CHANGE_PASSWORD_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if(errors){
        dispatch({
          type: USER_CHANGE_PASSWORD_FAILED,
          payload: err.response.data
        });
      }
    }
  }