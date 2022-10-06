import {
    AUTH_RESEND_VERIFICATION_EMAIL_LOADING,
    AUTH_RESEND_VERIFICATION_EMAIL_FAILED,
    AUTH_RESEND_VERIFICATION_EMAIL_SUCCESS,
    RESET_ALL_ALERTS
} from '../types';
import api from '../../utils/api'

export const resendEmailVerification = () => async dispatch => {
    dispatch({
      type: RESET_ALL_ALERTS
    })
    dispatch({
      type: AUTH_RESEND_VERIFICATION_EMAIL_LOADING
    })
    try {
      const res = await api.get('/auth/resend-verification-email');
      dispatch({
        type: AUTH_RESEND_VERIFICATION_EMAIL_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_RESEND_VERIFICATION_EMAIL_FAILED,
        payload: err.res.data
      });
    }
};