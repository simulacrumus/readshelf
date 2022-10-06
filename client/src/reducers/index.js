import { combineReducers } from 'redux';
import { auth } from './auth';
import { profile } from './profile'
import { books } from './books'
import { publicProfile } from './publicProfile';

export default combineReducers({
  auth,
  profile,
  books,
  publicProfile
});