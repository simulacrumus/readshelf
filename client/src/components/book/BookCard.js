import { Rating, Tooltip } from "@mui/material";
import React from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addBookToMyBooks } from "../../actions/book/addBookToMyBooks"
import { addBookToWishlist } from "../../actions/book/addBookToWishlist"
import { removeBookFromMyBooks } from "../../actions/book/removeBookFromMyBooks"
import { removeBookFromWishlist } from "../../actions/book/removeBookFromWishlist"
import { Box, Typography,} from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const BookCard = ({
    book,
    profile: {profile},
    addBookToMyBooks, 
    addBookToWishlist,
    removeBookFromMyBooks,
    removeBookFromWishlist,
    key, 
    showActions=false
}) => {
    const { 
        googleApiId,
        title, 
        authors, 
        publishedDate, 
        pageCount,
        imageLinks,
        averageRating,
    } = book

    const {
        wishlist,
        myBooks
    } = profile

    const isInWishlist = wishlist.some(wishlistBook => googleApiId === wishlistBook.googleApiId)
    const isInMyBooks = myBooks.some(myBook => googleApiId === myBook.googleApiId)

    return(
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1
                }}
            >
                <div 
                    className="book-card-x" 
                    style={{
                        display: 'flex',
                        padding: '5px'
                    }}
                >
                    {/* IMAGE */}
                    <Link to={`/books/${book.googleApiId}`}>
                        <div 
                            className="book-thumb-container" 
                            style={{
                                width: '80px',
                                minWidth: '80px',
                                float: 'none',
                                padding: '12px 2px 5px 0px'
                            }}
                        >
                            <img 
                                src={(imageLinks && imageLinks.thumbnail) ? imageLinks.thumbnail : '/default_book_cover.jpg'} 
                                alt={title} 
                                style={{
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    fontSize: '10px'
                                }}
                            />
                        </div>
                    </Link>
                    <div 
                        className="book-info-container"
                        style={{
                            marginLeft: '5px',
                            float: 'none',
                            padding: '12px 5px 5px 5px',
                        }}
                    >
                        {/* TITLE */}
                        <Link 
                            to={`/books/${book.googleApiId}`} 
                            style={{
                                textDecoration:'none',
                                "&:hover": {
                                    textDecoration:'underline'
                                }
                                
                            }}
                        >
                            <div className="book-title" >
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h6"
                                    sx={{fontFamily: "'Merriweather', serif"}}
                                >
                                    {title}
                                </Typography>
                            </div>
                        </Link>

                        {/* AUTHOR(S) */}
                        <div 
                            className="book-authors" 
                            style={{display: 'flex',}}
                        >
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="subtitle2"
                            >
                                by&nbsp;
                            </Typography>
                            {(authors && authors.map(author => 
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="subtitle2"
                                    sx={{float: "left"}}
                                    key={author}
                                >
                                    {author}&nbsp;
                                </Typography>
                            ))}
                        </div>
                        <div  style={{
                                    display: 'inline-block'
                                }}>

                            {/* RATING */}
                            <div className="book-rating" style={{display: 'flex',}}>
                                <Rating 
                                    value={averageRating} 
                                    precision={0.5} 
                                    readOnly 
                                    size="small"
                                    sx={{fontSize: '0.75rem', color: '#ff9900', paddingTop: '2.5px'}}
                                />
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="subtitle2"
                                >
                                    &nbsp;{averageRating}&nbsp;
                                </Typography>
                            </div>

                            {/* PAGE COUNT */}
                            <div style={{display:'flex'}}>
                                <div className="book-page-count">
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="subtitle2"
                                    >
                                        {pageCount && `${pageCount} pages •`} 
                                    </Typography>
                                </div>

                                {/* BOOK DATE */}
                                <div className="book-date">
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="subtitle2"
                                    >
                                        &nbsp;{new Date(publishedDate).getFullYear()}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        {showActions && 
                            <div 
                                className="book-actions"
                                style={{}}
                            >
                                <Box spacing={0} direction="row" sx={{display: 'flex'}}>
                                    <div style={{paddingRight:"10px"}}>
                                        {isInWishlist ? 
                                            <Tooltip title="Remove from wishlist">
                                                <FavoriteIcon 
                                                    sx={{fontSize:'1rem',color: '#ff4d4d', cursor: 'pointer'}}
                                                    onClick={() => removeBookFromWishlist(book.googleApiId)}
                                                /> 
                                            </Tooltip>
                                            : 
                                            <Tooltip title="Add to wishlist">
                                                <FavoriteBorderIcon
                                                    sx={{fontSize:'1rem',cursor: 'pointer', }}
                                                    onClick={() => addBookToWishlist(book.googleApiId)} 
                                                />
                                            </Tooltip>
                                        }
                                    </div>
                                    <div>
                                        {isInMyBooks ? 
                                            <Tooltip title="Remove from my books">
                                                <BookmarkAddedIcon 
                                                    sx={{fontSize:'1rem', color: '#009933', cursor: 'pointer'}}
                                                    onClick={() => removeBookFromMyBooks(book.googleApiId) }
                                                /> 
                                            </Tooltip>
                                            : 
                                            <Tooltip title="Add to my books">
                                                <BookmarkAddIcon
                                                    sx={{fontSize:'1rem', cursor: 'pointer'}}
                                                    onClick={()=> addBookToMyBooks(book.googleApiId)}
                                                />
                                            </Tooltip>
                                        }
                                    </div>
                                </Box>
                            </div>
                        }
                    </div>
                </div>
            </Box>
        </>
    )
}

const mapStateToProps = state => ({
    profile: state.profile,
    books: state.books
});

export default connect(mapStateToProps, {
    addBookToMyBooks, 
    addBookToWishlist,
    removeBookFromMyBooks,
    removeBookFromWishlist
})(BookCard)