import {
    AUTH_VERIFY_EMAIL_LOADING,
    AUTH_VERIFY_EMAIL_SUCCESS,
    AUTH_VERIFY_EMAIL_FAILED,
    RESET_ALL_ALERTS
} from '../types';
import api from '../../utils/api'

export const verifyEmail = (verificationCode) => async dispatch => {
  const body = { verificationCode }
  dispatch({
    type: RESET_ALL_ALERTS
  })
  dispatch({
    type: AUTH_VERIFY_EMAIL_LOADING
  })
  try {
    const res = await api.put('/auth/verify-email', body);
    dispatch({
      type: AUTH_VERIFY_EMAIL_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_VERIFY_EMAIL_FAILED,
      payload: "Email verification failed"
    });
  }
};