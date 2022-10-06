import {
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_LOADING,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAILED,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_FIELDS_UPDATE_LOADING,
  USER_FIELDS_UPDATE_SUCCESS,
  USER_FIELDS_UPDATE_FAILED,
  USER_CHANGE_PASSWORD_LOADING,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAILED,
  USER_RESET_PASSWORD_LOADING,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAILED,
  AUTH_GOOGLE_OAUTH_URL_LOAD_SUCCESS,
  USER_LOGOUT,
  AUTH_RESEND_VERIFICATION_EMAIL_LOADING,
  AUTH_RESEND_VERIFICATION_EMAIL_SUCCESS, 
  AUTH_RESEND_VERIFICATION_EMAIL_FAILED,
  AUTH_VERIFY_EMAIL_LOADING,
  AUTH_VERIFY_EMAIL_SUCCESS,
  AUTH_VERIFY_EMAIL_FAILED,
  AUTH_REQUEST_RESET_PASSWORD_LOADING,
  AUTH_REQUEST_RESET_PASSWORD_SUCCESS,
  AUTH_REQUEST_RESET_PASSWORD_FAILED,
  RESET_ALL_ALERTS
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    emailVerified: false,
    googleOAuthURL:'',
    user: null,
    isLoading: {
      user:false,
      signup:false,
      login:false,
      updateUser:false,
      requestResetPassword:false,
      resetPassword:false,
      changeEmail:false,
      changePassword:false,
      deleteAccount:false,
      sendVerificationEmail: false,
      setNewPassword: false,
      verifyEmail: false
    },
    error:{
      load:'',
      firstName:'',
      lastName:'',
      email:'',
      newEmail:'',
      password:'',
      newPassword:'',
      confirmPassword:'',
      currentPassword:'',
      signup:'',
      login:'',
      requestResetPassword:'',
      resetPassword:'',
      changeEmail:'',
      changePassword:'',
      deleteAccount:'',
      updateUser:'',
      sendVerificationEmail:'',
      setNewPassword:'',
      verifyEmail:''
    },
    success:{
      load:'',
      signup:'',
      login:'',
      requestResetPassword:'',
      resetPassword:'',
      changeEmail:'',
      changePassword:'',
      currentPassword:'',
      deleteAccount:'',
      updateUser:'',
      sendVerificationEmail:'',
      setNewPassword:'',
      verifyEmail:''
    }
}

export const auth = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type){
      case USER_REGISTER_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            signup: true
          }
        }
      case USER_REGISTER_SUCCESS:
        return {
          ...state,
          token: payload.token,
          user: {
            ...state.user,
            ...payload
          },
          isAuthenticated: true,
          isLoading:{
            ...state.isLoading,
            signup: false
          },
          success: {
            ...state.success,
            signup: payload.msg,
          },
          error: {
            ...state.error,
            signup: '',
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:'',
          }
        }
      case USER_REGISTER_FAILED:
        payload.errors.reverse();
        payload.errors.forEach(err => {
          for (var key in state.error) {
            if(key===err.param){
                state.error[key] = err.msg
            } 
          }
        })
        return {
          ...state,
          isLoading:{
            ...state.isLoading,
            signup: false
          },
          error: {
            ...state.error,
            signup: payload.message
          },
          success: {
            ...state.success,
            signup: ''
          }
        }
      case USER_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            load: true
          }
        }
      case USER_LOAD_SUCCESS:
        return{
          ...state,
          isAuthenticated: true,
          emailVerified: payload.emailVerified,
          user: {
            ...state.user,
            ...payload
          },
          isLoading: {
            ...state.isLoading,
            load: false
          },
          success: {
            ...state.success,
            load: 'User loaded'
          },
          error:{
            ...state.error,
            load: ''
          }
        }
      case USER_LOAD_FAILED:
        return{
          ...state,
          user: null,
          isLoading: {
            ...state.isLoading,
            user: false
          },
          success: {
            ...state.success,
            load: ''
          },
          error:{
            ...state.error,
            load: 'User could not load'
          }
        }
      case USER_LOGIN_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            login: true
          }
        }
      case USER_LOGIN_SUCCESS:
        return{
          ...state,
          // isAuthenticated: true,
          token: payload.token,
          isLoading: {
            ...state.isLoading,
            login: false
          },
          success: {
            ...state.success,
            login: payload.message
          },
          error:{
            ...state.error,
            login: ''
          }
        }
      case USER_LOGIN_FAILED:
        payload.errors.reverse();
        payload.errors.forEach(err => {
          for (var key in state.error) {
            if(key===err.param){
              state.error[key] = err.msg
            } 
          }
        })
        return{
          ...state,
          // isAuthenticated: false,
          isLoading:{
            ...state.isLoading,
            login: false
          },
          success: {
            ...state.success,
            login: ''
          },
          error:{
            ...state.error,
          }
        }
      case AUTH_GOOGLE_OAUTH_URL_LOAD_SUCCESS:
        return{
          ...state,
          googleOAuthURL: payload
        }
      case USER_FIELDS_UPDATE_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateUser: true
          }
        }
      case USER_FIELDS_UPDATE_SUCCESS:
        return{
          ...state,
          user: {
            ...state.user,
            ...payload
          },
          isLoading: {
            ...state.isLoading,
            updateUser: false
          },
          success: {
            ...state.success,
            updateUser: 'User updated'
          },
          error:{
            ...state.error,
            updateUser: '',
            firstName: '',
            lastName:''
          }
        }
      case USER_FIELDS_UPDATE_FAILED:
        payload.errors.reverse();
        payload.errors.forEach(err => {
          for (var key in state.error) {
            if(key===err.param){
                state.error[key] = err.msg
            } 
          }
        })
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateUser: false
          },
          success: {
            ...state.success,
            updateUser: ''
          },
          error:{
            ...state.error,
            updateUser: payload.message,
          }
        }
      case USER_CHANGE_PASSWORD_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            changePassword: true
          },
          success: {
            ...state.success,
            changePassword: ''
          },
          error:{
            ...state.error,
            changePassword: '',
            email:'',
            password:'',
            newPassword:'',
          }
        }
      case USER_CHANGE_PASSWORD_SUCCESS:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            changePassword: false
          },
          success: {
            ...state.success,
            changePassword: 'Password changed'
          },
          error:{
            ...state.error,
            changePassword: '',
          }
        }
      case USER_CHANGE_PASSWORD_FAILED:
        payload.errors.reverse();
        payload.errors.forEach(err => {
          for (var key in state.error) {
            if(key===err.param){
                state.error[key] = err.msg
            } 
          }
        })
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            changePassword: false
          },
          success: {
            ...state.success,
            changePassword: '',
          },
          error:{
            ...state.error,
            changePassword: 'Password could not change',
          }
        }
      case AUTH_REQUEST_RESET_PASSWORD_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            requestResetPassword: true
          },
          success: {
            ...state.success,
            requestResetPassword: ''
          },
          error:{
            ...state.error,
            requestResetPassword:''
          }
        }
      case AUTH_REQUEST_RESET_PASSWORD_SUCCESS:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            requestResetPassword: false
          },
          success: {
            ...state.success,
            requestResetPassword: payload.message
          },
          error:{
            ...state.error,
            requestResetPassword: '',
          }
        }
      case AUTH_REQUEST_RESET_PASSWORD_FAILED:
        payload.errors.reverse();
        payload.errors.forEach(err => {
          for (var key in state.error) {
            if(key===err.param){
                state.error[key] = err.msg
            } 
          }
        })
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            requestResetPassword: false
          },
          success: {
            ...state.success,
            requestResetPassword: '',
          },
          error:{
            ...state.error,
            requestResetPassword: 'Reset password request failed',
          }
        }
      case USER_RESET_PASSWORD_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            resetPassword: true
          },
          success: {
            ...state.success,
            resetPassword: ''
          },
          error:{
            ...state.error,
            resetPassword: ''
          }
        }
      case USER_RESET_PASSWORD_SUCCESS:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            resetPassword: false
          },
          success: {
            ...state.success,
            resetPassword: 'Password successfully changed'
          },
          error:{
            ...state.error,
            resetPassword: ''
          }
        }
      case USER_RESET_PASSWORD_FAILED:
        payload.errors.reverse();
        payload.errors.forEach(err => {
          for (var key in state.error) {
            if(key===err.param){
                state.error[key] = err.msg
            } 
          }
        })
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            resetPassword: false
          },
          success: {
            ...state.success,
            resetPassword: ''
          },
          error:{
            ...state.error,
            resetPassword: 'Resetting password failed'
          }
        }
      case AUTH_VERIFY_EMAIL_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            verifyEmail: true
          },
          success: {
            ...state.success,
            verifyEmail: ''
          },
          error:{
            ...state.error,
            verifyEmail: ''
          }
        }
      case AUTH_VERIFY_EMAIL_SUCCESS:
        return{
          ...state,
          emailVerified: true,
          isLoading: {
            ...state.isLoading,
            verifyEmail: false
          },
          success: {
            ...state.success,
            verifyEmail: 'Email verified'
          },
          error:{
            ...state.error,
            verifyEmail: ''
          }
        }
      case AUTH_VERIFY_EMAIL_FAILED:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            verifyEmail: false
          },
          success: {
            ...state.success,
            verifyEmail: ''
          },
          error:{
            ...state.error,
            verifyEmail: 'Email could not verify'
          }
        }
      case AUTH_RESEND_VERIFICATION_EMAIL_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            sendVerificationEmail: true
          },
          error: {
            ...state.error,
            sendVerificationEmail: ''
          },
          success: {
            ...state.success,
            sendVerificationEmail: ''
          }
        }
      case AUTH_RESEND_VERIFICATION_EMAIL_SUCCESS:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            sendVerificationEmail: false
          },
          error: {
            ...state.error,
            sendVerificationEmail:''
          },
          success: {
            ...state.success,
            sendVerificationEmail:'Verification email sent'
          }
        }
      case AUTH_RESEND_VERIFICATION_EMAIL_FAILED:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            sendVerificationEmail: false
          },
          error: {
            ...state.error,
            sendVerificationEmail:'Verification email could not sent, please try again later'
          },
          success: {
            ...state.success,
            sendVerificationEmail:''
          }
        }
      case RESET_ALL_ALERTS:
        Object.keys(state.error).forEach(key => { state.error[key] = "" })
        Object.keys(state.success).forEach(key => { state.success[key] = "" })
        return {
          ...state
        }
      case USER_LOGOUT:
        return{
          ...initialState,
          token: null
        }
      default:
        return state;
    }
  }