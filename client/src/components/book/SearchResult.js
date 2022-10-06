import React from "react"
import { connect } from "react-redux";
import { Divider, Box, Typography} from '@mui/material';
import BookCard from "./BookCard";
import CircularProgress from '@mui/material/CircularProgress';

const SearchResult = ({
    books,
    error,
    isLoading
}) => {
    return (
        <Box className={'book-search-result'} >

            {/* ERROR MESSAGE */}
            {error.globalSearch && 
                <Box
                    sx={{p:2}}
                >
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="body2"
                        sx={{textAlign: 'center', }}
                    >
                        {error.globalSearch}
                    </Typography>
                </Box>
            
            }

            {/* SPINNER */}
            {isLoading.globalSearch &&
                <Box sx={{display: 'flex', justifyContent: 'center', p:2}}>
                    <CircularProgress color="primary" />
                </Box>
            }
            
            {/* RESULT */}
            {books && (books.map(book => {
                return (
                    <Box
                        key={book.googleApiId}
                    >
                        <BookCard
                            book={book}
                            key={ book.googleApiId}
                            showActions={true}
                        />
                        <Divider />
                    </Box>
                )
            }))}
        </Box>
    )
}

const mapStateToProps = state => ({
    error: state.books.error,
    isLoading: state.books.isLoading
});

export default connect(mapStateToProps)(SearchResult)