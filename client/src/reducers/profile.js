import { 
  PROFILE_LOADING,
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_FAILED,
  PROFILE_FIELDS_UPDATE_LOADING,
  PROFILE_FIELDS_UPDATE_SUCCESS,
  PROFILE_FIELDS_UPDATE_FAILED,
  PROFILE_AVATAR_UPDATE_LOADING,
  PROFILE_AVATAR_UPDATE_SUCCESS,
  PROFILE_AVATAR_UPDATE_FAILED,
  PROFILE_NEWSLETTER_UPDATE_SUCCESS,
  PROFILE_NEWSLETTER_UPDATE_FAILED,
  PROFILE_NEWSLETTER_UPDATE_LOADING,
  PROFILE_PRIVATE_ACCOUNT_UPDATE_LOADING,
  PROFILE_PRIVATE_ACCOUNT_UPDATE_SUCCESS,
  PROFILE_PRIVATE_ACCOUNT_UPDATE_FAILED,
  BOOK_ADD_TO_WISHLIST_LOADING,
  BOOK_ADD_TO_WISHLIST_SUCCESS,
  BOOK_ADD_TO_WISHLIST_FAILED,
  BOOK_ADD_TO_MY_BOOKS_LOADING,
  BOOK_ADD_TO_MY_BOOKS_SUCCESS,
  BOOK_ADD_TO_MY_BOOKS_FAILED,
  BOOK_REMOVE_FROM_WISHLIST_LOADING,
  BOOK_REMOVE_FROM_WISHLIST_SUCCESS,
  BOOK_REMOVE_FROM_WISHLIST_FAILED,
  BOOK_REMOVE_FROM_MY_BOOKS_LOADING,
  BOOK_REMOVE_FROM_MY_BOOKS_SUCCESS,
  BOOK_REMOVE_FROM_MY_BOOKS_FAILED,
  BOOK_ADD_TO_RECENTLY_VIEWED_BOOKS_SUCCESS,
  REVIEW_ADD_REVIEW_LOADING,
  REVIEW_ADD_REVIEW_SUCCESS,
  REVIEW_ADD_REVIEW_FAILED,
  REVIEW_REMOVE_REVIEW_LOADING,
  REVIEW_REMOVE_REVIEW_SUCCESS,
  REVIEW_REMOVE_REVIEW_FAILED,
  PROFILE_AVATAR_DELETE_LOADING,
  PROFILE_AVATAR_DELETE_SUCCESS,
  PROFILE_AVATAR_DELETE_FAILED,
  USER_LOGOUT,
  RESET_ALL_ALERTS
} from "../actions/types";

const initialState = {
    profile: null,
    isLoading: {
      loadProfile: false,
      updateAvatar: false,
      deleteAvatar: false,
      updateFields: false,
      updateMyBooks: false,
      updateWishlist: false,
      postReview: false,
      removeReview: false,
      updateNewsletterSubscription: false,
      updateAccountPrivacy:false
    },
    error:{
      loadProfile: '',
      updateAvatar: '',
      deleteAvatar:'',
      updateFields: '',
      updateMyBooks: '',
      updateWishlist: '',
      postReview: '',
      removeReview:'',
      updateNewsletterSubscription: '',
      updateAccountPrivacy: '',
      login:'',
      bio:'', 
      twitter:'', 
      facebook:'', 
      youtube:'', 
      instagram:'',
      website:'', 
      country:'',
      state:'',
      city:'',
    },
    success:{
      loadProfile: '',
      updateAvatar: '',
      deleteAvatar:'',
      updateFields: '',
      updateMyBooks: '',
      updateWishlist: '',
      postReview: '',
      removeReview:'',
      updateNewsletterSubscription: '',
      updateAccountPrivacy: ''
    }
}

export const profile = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type){
      case PROFILE_LOADING:
        return{
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
      case PROFILE_LOAD_SUCCESS:
        return{
          ...state,
          profile: {
            ...state.profile,
            ...payload
          },
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
            loadProfile:'Profile loaded'
          }
        }
      case PROFILE_LOAD_FAILED:
        return{
          ...state,
          profile: null,
          isLoading: {
            ...state.isLoading,
            loadProfile: false
          },
          error: {
            ...state.error,
            loadProfile: 'Profile load failed'
          },
          success: {
            ...state.success,
            loadProfile:''
          }
        }
      case PROFILE_FIELDS_UPDATE_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateFields: true
          },
          error: {
            ...state.error,
            updateFields: ''
          },
          success: {
            ...state.success,
            updateFields:''
          }
        }
      case PROFILE_FIELDS_UPDATE_SUCCESS:
        return{
          ...state,
          profile: {
            ...state.profile,
            ...payload
          },
          isLoading: {
            ...state.isLoading,
            updateFields: false
          },
          error: {
            ...state.error,
            updateFields: ''
          },
          success: {
            ...state.success,
            updateFields:'Profile fields updated!'
          }
        }
      case PROFILE_FIELDS_UPDATE_FAILED:
        payload.errors.reverse();
        payload.errors.forEach(err => {
          for (const key in state.error) {
            if(key===err.param){
              state.error[key] = err.msg
            } 
          }
        })
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateFields: false
          },
          error: {
            ...state.error,
            updateFields: payload.message
          },
          success: {
            ...state.success,
            updateFields:''
          }
        }
      case PROFILE_NEWSLETTER_UPDATE_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateNewsletterSubscription: true
          },
          error: {
            ...state.error,
            updateNewsletterSubscription: ''
          },
          success: {
            ...state.success,
            updateNewsletterSubscription: ''
          }
        }
      case PROFILE_NEWSLETTER_UPDATE_SUCCESS:
        return{
          ...state,
          profile: {
            ...state.profile,
            newsletter: payload
          },
          isLoading: {
            ...state.isLoading,
            updateNewsletterSubscription: false
          },
          error: {
            ...state.error,
            updateNewsletterSubscription: ''
          },
          success: {
            ...state.success,
            updateNewsletterSubscription: 'Newsletter subscription updated!'
          }
        }
      case PROFILE_NEWSLETTER_UPDATE_FAILED:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateNewsletterSubscription: false
          },
          error: {
            ...state.error,
            updateNewsletterSubscription: 'Newsletter subscription update failed!'
          },
          success: {
            ...state.success,
            updateNewsletterSubscription: ''
          }
        }
      case PROFILE_PRIVATE_ACCOUNT_UPDATE_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateAccountPrivacy: true
          },
          error: {
            ...state.error,
            updateAccountPrivacy: ''
          },
          success: {
            ...state.success,
            updateAccountPrivacy: ''
          }
        }
      case PROFILE_PRIVATE_ACCOUNT_UPDATE_SUCCESS:
        return{
          ...state,
          profile: {
            ...state.profile,
            privateAccount: payload
          },
          isLoading: {
            ...state.isLoading,
            updateAccountPrivacy: false
          },
          error: {
            ...state.error,
            updateAccountPrivacy: ''
          },
          success: {
            ...state.success,
            updateAccountPrivacy: 'Account privacy setting updated!'
          }
        }
      case PROFILE_PRIVATE_ACCOUNT_UPDATE_FAILED:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateAccountPrivacy: false
          },
          error: {
            ...state.error,
            updateAccountPrivacy: 'Account privacy setting update failed!'
          },
          success: {
            ...state.success,
            updateAccountPrivacy: ''
          }
        }
      case PROFILE_AVATAR_UPDATE_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateAvatar: true
          },
          error: {
            ...state.error,
            updateAvatar: ''
          },
          success: {
            ...state.success,
            updateAvatar:''
          }
        }
      case PROFILE_AVATAR_UPDATE_SUCCESS:
        return{
          ...state,
          profile: {
            ...state.profile,
            ...payload
          },
          isLoading: {
            ...state.isLoading,
            updateAvatar: false
          },
          error: {
            ...state.error,
            updateAvatar: ''
          },
          success: {
            ...state.success,
            updateAvatar:'Profile picture updated!'
          }
        }
      case PROFILE_AVATAR_UPDATE_FAILED:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateAvatar: false
          },
          error: {
            ...state.error,
            updateAvatar: 'Profile picture could not update'
          },
          success: {
            ...state.success,
            updateAvatar:''
          }
        }
      case PROFILE_AVATAR_DELETE_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            deleteAvatar: true
          },
          success: {
            ...state.error,
            deleteAvatar: ''
          },
          error: {
            ...state.success,
            deleteAvatar: ''
          }
        }
      case PROFILE_AVATAR_DELETE_SUCCESS:
        return{
          ...state,
          profile: {
            ...state.profile,
            avatar: {}
          },
          isLoading: {
            ...state.isLoading,
            deleteAvatar: false
          },
          success: {
            ...state.error,
            deleteAvatar: 'Avatar removed'
          },
          error: {
            ...state.success,
            deleteAvatar: ''
          }
        }
        case PROFILE_AVATAR_DELETE_FAILED:
          return{
            ...state,
            isLoading: {
              ...state.isLoading,
              deleteAvatar: false
            },
            success: {
              ...state.error,
              deleteAvatar: ''
            },
            error: {
              ...state.success,
              deleteAvatar: 'Avatar could not remove'
            }
          }
      case BOOK_ADD_TO_WISHLIST_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateWishlist: true
          },
          error: {
            ...state.error,
            updateWishlist: ''
          },
          success: {
            ...state.success,
            updateWishlist:''
          }
        }
      case BOOK_ADD_TO_WISHLIST_SUCCESS:
        return{
          ...state,
          profile:{
            ...state.profile,
            ...payload
          },
          isLoading: {
            ...state.isLoading,
            updateWishlist: false
          },
          error: {
            ...state.error,
            updateWishlist: ''
          },
          success: {
            ...state.success,
            updateWishlist:'Added to wishlist'
          }
        }
      case BOOK_ADD_TO_WISHLIST_FAILED:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateWishlist: false
          },
          error: {
            ...state.error,
            updateWishlist: payload.message
          },
          success: {
            ...state.success,
            updateWishlist:''
          }
        }
      case BOOK_REMOVE_FROM_WISHLIST_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateWishlist: true
          },
          error: {
            ...state.error,
            updateWishlist: ''
          },
          success: {
            ...state.success,
            updateWishlist:''
          }
        }
      case BOOK_REMOVE_FROM_WISHLIST_SUCCESS:
        return{
          ...state,
          profile:{
            ...state.profile,
            ...payload
          },
          isLoading: {
            ...state.isLoading,
            updateWishlist: false
          },
          error: {
            ...state.error,
            updateWishlist: ''
          },
          success: {
            ...state.success,
            updateWishlist:'Removed from wishlist'
          }
        }
      case BOOK_REMOVE_FROM_WISHLIST_FAILED:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateWishlist: false
          },
          error: {
            ...state.error,
            updateWishlist: payload.message
          },
          success: {
            ...state.success,
            updateWishlist:''
          }
        }
      case BOOK_ADD_TO_MY_BOOKS_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateMyBooks: true
          },
          error: {
            ...state.error,
            updateMyBooks: ''
          },
          success: {
            ...state.success,
            updateMyBooks:''
          }
        }
      case BOOK_ADD_TO_MY_BOOKS_SUCCESS:
        return{
          ...state,
          profile:{
            ...state.profile,
            ...payload
          },
          isLoading: {
            ...state.isLoading,
            updateMyBooks: false
          },
          error: {
            ...state.error,
            updateMyBooks: ''
          },
          success: {
            ...state.success,
            updateMyBooks:'Added to my books'
          }
        }
      case BOOK_ADD_TO_MY_BOOKS_FAILED:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateMyBooks: false
          },
          error: {
            ...state.error,
            updateMyBooks: payload.message
          },
          success: {
            ...state.success,
            updateMyBooks:''
          }
        }
      case BOOK_REMOVE_FROM_MY_BOOKS_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateMyBooks: true
          },
          error: {
            ...state.error,
            updateMyBooks: ''
          },
          success: {
            ...state.success,
            updateMyBooks:''
          }
        }
      case BOOK_REMOVE_FROM_MY_BOOKS_SUCCESS:
        return{
          ...state,
          profile:{
            ...state.profile,
            ...payload
          },
          isLoading: {
            ...state.isLoading,
            updateMyBooks: false
          },
          error: {
            ...state.error,
            updateMyBooks: ''
          },
          success: {
            ...state.success,
            updateMyBooks:'Removed from my books'
          }
        }
      case BOOK_REMOVE_FROM_MY_BOOKS_FAILED:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            updateMyBooks: false
          },
          error: {
            ...state.error,
            updateMyBooks: payload.message
          },
          success: {
            ...state.success,
            updateMyBooks:''
          }
        }
      case BOOK_ADD_TO_RECENTLY_VIEWED_BOOKS_SUCCESS:
        return{
          ...state,
          profile: {
            ...state.profile,
            ...payload
          }
        }
      case REVIEW_ADD_REVIEW_LOADING:
        return {
          ...state,
          isLoading: {
            ...state.isLoading,
            postReview: true
          },
          error: {
            ...state.error,
            postReview: ''
          },
          success: {
            ...state.success,
            postReview:''
          }
        }
      case REVIEW_ADD_REVIEW_SUCCESS:
        if(!Boolean(state.profile.reviews))
            state.profile.reviews = [payload]
        else if(!state.profile.reviews.some(review => review._id === payload._id))
            state.profile.reviews.push(payload)
        return {
          ...state,
            profile: {
            ...state.profile,
            reviews: state.profile.reviews.map(review => {return review._id === payload._id ? payload : review})
          },
          isLoading: {
            ...state.isLoading,
            postReview: false
          },
          success: {
            ...state.error,
            postReview: 'Review posted'
          },
          error: {
            ...state.success,
            postReview:''
          }
        }
      case REVIEW_ADD_REVIEW_FAILED:
        return {
          ...state,
          isLoading: {
            ...state.isLoading,
            postReview: false
          },
          success: {
            ...state.error,
            postReview: ''
          },
          error: {
            ...state.success,
            postReview: 'Review could not add'
          }
        }
      case REVIEW_REMOVE_REVIEW_LOADING:
        return{
          ...state,
          isLoading: {
            ...state.isLoading,
            removeReview: true
          },
          success: {
            ...state.error,
            postReview: ''
          },
          error: {
            ...state.success,
            postReview: ''
          }
        }
      case REVIEW_REMOVE_REVIEW_SUCCESS:
          return{
          ...state,
          profile: {
            ...state.profile,
            reviews: state.profile.reviews.filter(review => review._id !== payload.id)
          },
          isLoading: {
            ...state.isLoading,
            removeReview: false
          },
          success: {
            ...state.error,
            postReview: 'Review removed!'
          },
          error: {
            ...state.success,
            postReview: ''
          }
        }
      case REVIEW_REMOVE_REVIEW_FAILED:
          return{
          ...state,
          isLoading: {
            ...state.isLoading,
            removeReview: false
          },
          success: {
            ...state.error,
            postReview: '!'
          },
          error: {
            ...state.success,
            postReview: 'Removing review unsuccessful'
          }
        }
      case RESET_ALL_ALERTS:
          Object.keys(state.error).forEach(key => { state.error[key] = "" })
          Object.keys(state.success).forEach(key => { state.success[key] = "" })
          return state
      case USER_LOGOUT:
        return initialState
      default:
        return state;
    }
  }