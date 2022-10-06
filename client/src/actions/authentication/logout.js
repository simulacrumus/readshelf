import {
    USER_LOGOUT
} from '../types';

export const logout = () => async dispatch => {
    localStorage.removeItem('token');
    localStorage.clear()
    dispatch({
      type: USER_LOGOUT
    })
}