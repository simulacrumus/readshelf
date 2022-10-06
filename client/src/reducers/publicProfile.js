import { 
    PUBLIC_PROFILE_LOADING,
    PUBLIC_PROFILE_LOAD_SUCCESS,
    PUBLIC_PROFILE_LOAD_FAILED,
    USER_LOGOUT
} from "../actions/types";

const initialState = {
    profile: null,
    user: null,
    isLoading: {
        loadProfile:'',
    },
    error:{
        loadProfile:''
    },
    success:{
        loadProfile:''
    }
}

export const publicProfile = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type){
        case PUBLIC_PROFILE_LOADING:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    loadProfile: true
                },
                error: {
                    ...state.error,
                    loadProfile: ''
                },
                success: {
                    ...state.success,
                    loadProfile:''
                }
            }
        case PUBLIC_PROFILE_LOAD_SUCCESS:
            return {
                ...state,
                profile: payload.profile,
                user: payload.user,
                isLoading: {
                    ...state.isLoading,
                    loadProfile: false
                },
                error: {
                    ...state.error,
                    loadProfile: ''
                },
                success: {
                    ...state.success,
                    loadProfile:'Public Profile Loaded'
                }
            }
        case PUBLIC_PROFILE_LOAD_FAILED:
            return {
                ...state,
                profile: null,
                user: null,
                isLoading: {
                    ...state.isLoading,
                    loadProfile: false
                },
                error: {
                    ...state.error,
                    loadProfile: 'Public Prfile Load Failed'
                },
                success: {
                    ...state.success,
                    loadProfile:''
                }
            }
        case USER_LOGOUT:
            return initialState
        default:
            return state;
    }

}