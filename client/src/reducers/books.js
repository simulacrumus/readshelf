import { 
    BOOK_GLOABAL_SEARCH_LOADING,
    BOOK_GLOABAL_SEARCH_SUCCESS,
    BOOK_GLOABAL_SEARCH_FAILED,    
    BOOK_CURRENT_BOOK_LOADING,
    BOOK_CURRENT_BOOK_LOAD_SUCCESS,
    BOOK_CURRENT_BOOK_LOAD_FAILED,
    REVIEW_ADD_REVIEW_SUCCESS,
    REVIEW_REMOVE_REVIEW_SUCCESS,
    USER_LOGOUT,
    RESET_ALL_ALERTS,
    BOOK_GET_BEST_SELLER_BOOKS_LOADING,
    BOOK_GET_BEST_SELLER_BOOKS_SUCCESS,
    BOOK_GET_BEST_SELLER_BOOKS_FAILED
} from "../actions/types";

const initialState = {
    searchResult: [],
    currentBook: null,
    bestSellerBooks: [],
    isLoading: {
        globalSearch: false,
        searchByAuthor: false,
        currentBook: false,
        bestSellerBooks: false
    },
    error: {
        globalSearch:'',
        searchByAuthor:'',
        currentBook:'',
        bestSellerBooks: ''
    },
    success:{
        globalSearch:'',
        searchByAuthor:'',
        currentBook:'',
        bestSellerBooks: ''
    }
}

export const books = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch(type){
        case BOOK_CURRENT_BOOK_LOADING:
            return{
                ...state,
                currentBook: null,
                isLoading: {
                    ...state.isLoading,
                    currentBook: true
                },
                error: {
                    ...state.error,
                    currentBook:''
                },
                success: {
                    ...state.success,
                    currentBook:''
                }
            }
        case BOOK_CURRENT_BOOK_LOAD_SUCCESS:
            return{
                ...state,
                currentBook: payload,
                isLoading: {
                    ...state.isLoading,
                    currentBook: false
                },
                error: {
                    ...state.error,
                    currentBook:''
                },
                success: {
                    ...state.success,
                    currentBook:'Book loaded'
                }
            }
        case BOOK_CURRENT_BOOK_LOAD_FAILED:
            return{
                ...state,
                currentBook: null,
                isLoading: {
                    ...state.isLoading,
                    currentBook: false
                },
                error: {
                    ...state.error,
                    currentBook: payload
                },
                success: {
                    ...state.success,
                    currentBook:''
                }
            }
        case BOOK_GLOABAL_SEARCH_LOADING:
            return {
                ...state,
                searchResult: [],
                isLoading: {
                    ...state.isLoading,
                    globalSearch: true
                },
                error: {
                    ...state.error,
                    globalSearch: ''
                },
                success:{
                    ...state.success,
                    globalSearch: ''
                }
            }
        case BOOK_GLOABAL_SEARCH_SUCCESS:
            return {
                ...state,
                searchResult: payload,
                isLoading: {
                    ...state.isLoading,
                    globalSearch: false
                },
                error: {
                    ...state.error,
                    globalSearch: ''
                },
                success:{
                    ...state.success,
                    globalSearch: 'Books loaded'
                }
            }
        case BOOK_GLOABAL_SEARCH_FAILED:
            return {
                ...state,
                searchResult: [],
                isLoading: {
                    ...state.isLoading,
                    globalSearch: false
                },
                error: {
                    ...state.error,
                    globalSearch: payload
                },
                success:{
                    ...state.success,
                    globalSearch: ''
                }
            }
            case BOOK_GET_BEST_SELLER_BOOKS_LOADING:
                return {
                    ...state,
                    isLoading: {
                        ...state.isLoading,
                        bestSellerBooks: true
                    },
                    error: {
                        ...state.error,
                        bestSellerBooks: ''
                    },
                    success:{
                        ...state.success,
                        bestSellerBooks: ''
                    }
                }
            case BOOK_GET_BEST_SELLER_BOOKS_SUCCESS:
                return {
                    ...state,
                    bestSellerBooks: payload,
                    isLoading: {
                        ...state.isLoading,
                        bestSellerBooks: false
                    },
                    error: {
                        ...state.error,
                        bestSellerBooks: ''
                    },
                    success:{
                        ...state.success,
                        bestSellerBooks: 'Bestseller books loaded'
                    }
                }
            case BOOK_GET_BEST_SELLER_BOOKS_FAILED:
                return {
                    ...state,
                    bestSellerBooks: [],
                    isLoading: {
                        ...state.isLoading,
                        bestSellerBooks: false
                    },
                    error: {
                        ...state.error,
                        bestSellerBooks: 'Bestseller books could not load'
                    },
                    success:{
                        ...state.success,
                        bestSellerBooks: ''
                    }
                }
        case REVIEW_ADD_REVIEW_SUCCESS:
            if(!Boolean(state.currentBook.reviews))
                state.currentBook.reviews = [payload]
            else if(!state.currentBook.reviews.some(review => review._id === payload._id))
                state.currentBook.reviews.push(payload)
            return {
                ...state,
                currentBook:{
                    ...state.currentBook,
                    reviews: state.currentBook.reviews.map(review => {return review._id === payload._id ? payload : review})
                }
            }
        case REVIEW_REMOVE_REVIEW_SUCCESS:
            return{
                ...state,
                currentBook:{
                    ...state.currentBook,
                    reviews: state.currentBook.reviews.filter(review => review._id !== payload.id)
                }
            }
        case RESET_ALL_ALERTS:
            Object.keys(state.error).forEach(key => { state.error[key] = "" })
            Object.keys(state.success).forEach(key => { state.success[key] = "" })
            return state
        case USER_LOGOUT:
            return initialState;
        default:
            return{
                ...state
            }
    }

}