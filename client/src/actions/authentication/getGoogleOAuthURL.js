import {
    AUTH_GOOGLE_OAUTH_URL_LOADING,
    AUTH_GOOGLE_OAUTH_URL_LOAD_SUCCESS,
    AUTH_GOOGLE_OAUTH_URL_LOAD_FAILED,
} from '../types';
import api from '../../utils/api'

export const getGoogleOAuthURL = () => async dispatch => {
    dispatch({
      type: AUTH_GOOGLE_OAUTH_URL_LOADING
    })
    try {
      const res = await api.get('/auth/google/url');
      dispatch({
        type: AUTH_GOOGLE_OAUTH_URL_LOAD_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if(errors){
        dispatch({
          type: AUTH_GOOGLE_OAUTH_URL_LOAD_FAILED,
          payload: err.response.data
        });
      }
    }
}