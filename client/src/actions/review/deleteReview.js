import api from '../../utils/api'
import { 
    REVIEW_REMOVE_REVIEW_LOADING,
    REVIEW_REMOVE_REVIEW_SUCCESS,
    REVIEW_REMOVE_REVIEW_FAILED,
} from '../types';

export const deleteReview = (id) => async dispatch => {
console.log(`Review ID: ${id}`)
  dispatch({
    type: REVIEW_REMOVE_REVIEW_LOADING
  })
  try {
    await api.delete(`/review/${id}`);
    dispatch({
      type: REVIEW_REMOVE_REVIEW_SUCCESS,
      payload: {id}
    });
  } catch (err) {
    dispatch({
      type: REVIEW_REMOVE_REVIEW_FAILED
    });
  }
}