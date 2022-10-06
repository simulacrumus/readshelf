import { connect } from 'react-redux'
import React from "react"
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { addBookToMyBooks } from "../../actions/book/addBookToMyBooks"
import { addBookToWishlist } from "../../actions/book/addBookToWishlist"
import { removeBookFromMyBooks } from "../../actions/book/removeBookFromMyBooks"
import { removeBookFromWishlist } from "../../actions/book/removeBookFromWishlist"
  
const BookImageAndActions = ({
    books: {currentBook}, 
    profile: {profile, isLoading},
    addBookToMyBooks, 
    removeBookFromMyBooks,
    addBookToWishlist,
    removeBookFromWishlist,
}) => {
    const { 
        googleApiId,
        imageLinks,
        title
    } = currentBook

    const {
        wishlist,
        myBooks
    } = profile

    const isInWishlist = wishlist.some(wishlistBook => googleApiId === wishlistBook.googleApiId)
    const isInMyBooks = myBooks.some(myBook => googleApiId === myBook.googleApiId)

    return(
        <Card >
            <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                 <CardMedia
                    component="img"
                    image={(imageLinks && imageLinks.thumbnail) ? imageLinks.thumbnail : '/default_book_cover.jpg'} 
                    alt={title}
                    sx={{
                        boxShadow: 20,
                        width: {
                            lg: '100%',
                            md: '100%',
                            sm: '100%',
                            xs: '40%',
                        },
                    }}
                />
            </Box>
            </CardContent>
            <CardActions >
                <Box 
                    direction="column" 
                    width="100%"
                    spacing={2}
                >
                    <LoadingButton
                        startIcon={isInWishlist ? <FavoriteIcon sx={{color: '#ff4d4d'}}/> : <FavoriteBorderIcon/>}
                        fullWidth
                        variant="text"
                        onClick={() => isInWishlist ? removeBookFromWishlist(googleApiId) : addBookToWishlist(googleApiId)}
                        sx={{
                            fontSize:'11px', 
                            fontWeight:'400',
                            display: 'flex', 
                            justifyContent: 'flex-start',  
                        }}
                        loading={isLoading.updateWishlist}
                        disabled={isLoading.updateWishlist}
                    >
                        {isInWishlist ? "Remove from " : "Add to " }wishlist
                    </LoadingButton>
                    <LoadingButton
                        startIcon={isInMyBooks ? <BookmarkAddedIcon sx={{color: '#009933'}}/> : <BookmarkAddIcon/>}
                        fullWidth
                        variant="text"
                        onClick={() => isInMyBooks ? removeBookFromMyBooks(googleApiId) : addBookToMyBooks(googleApiId)}
                        sx={{
                            fontSize:'11px', 
                            fontWeight:'400',
                            display: 'flex', 
                            justifyContent: 'flex-start',  
                        }}
                        loading={isLoading.updateMyBooks}
                        disabled={isLoading.updateMyBooks}
                    >
                        {isInMyBooks ? "Remove from " : "Add to " }my books
                    </LoadingButton>
                </Box>
            </CardActions>
      </Card>
    )
}

const mapStateToProps = state => ({
    books: state.books,
    profile: state.profile
});

export default connect(mapStateToProps, {
    removeBookFromMyBooks, 
    addBookToMyBooks,
    removeBookFromWishlist,
    addBookToWishlist})(BookImageAndActions);