import {
    USER_DELETE_ACCOUNT_LOADING,
    USER_DELETE_ACCOUNT_SUCCESS,
    USER_DELETE_ACCOUNT_FAILED,
} from '../types';
import api from '../../utils/api'

export const deleteUserAccount = () => async dispatch => {
    dispatch({
      type: USER_DELETE_ACCOUNT_LOADING
    })
    try {
      const res = await api.delete('/user', );
      dispatch({
        type: USER_DELETE_ACCOUNT_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        dispatch({
            type: USER_DELETE_ACCOUNT_FAILED,
            payload: err.response.data
        })
      }
    }
  }