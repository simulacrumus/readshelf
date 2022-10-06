import {
    USER_LOADING,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAILED,
} from '../types';
import api from '../../utils/api'
import { loadMyProfile } from '../profile/loadProfile';
import { getBestSellerBooks } from '../book/getBestSellerBooks';

export const loadUser = () => async dispatch => {
    dispatch({
      type: USER_LOADING
    })
    try {
      const res = await api.get('/user');
      dispatch({
        type: USER_LOAD_SUCCESS,
        payload: res.data
      });
      dispatch(loadMyProfile())
      dispatch(getBestSellerBooks())
    } catch (err) {
      dispatch({
        type: USER_LOAD_FAILED
      });
    }
};