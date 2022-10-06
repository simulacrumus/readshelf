import { 
    REVIEW_ADD_REVIEW_LOADING,
    REVIEW_ADD_REVIEW_SUCCESS,
    REVIEW_ADD_REVIEW_FAILED,
} from '../types';
import api from '../../utils/api'

export const addReview = (formData) => async dispatch => {
  const body = { ...formData }
  dispatch({
    type: REVIEW_ADD_REVIEW_LOADING
  })
  try {
    const res = await api.post('/review', body);
    dispatch({
      type: REVIEW_ADD_REVIEW_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: REVIEW_ADD_REVIEW_FAILED
    });
  }
}