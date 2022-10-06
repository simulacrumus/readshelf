import { Box, Rating, Typography } from "@mui/material";
import React, {} from "react" 
import { getFullDate } from '../../utils/getDates'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ImageReview = ({ review }) => {
    const StyledLink = styled(Link)`
        text-decoration: none;
        color: inherit;

        &:focus, &:hover, &:visited, &:link, &:active {
            text-decoration: none;
        }
    `;
    return(
        <Box
            sx={{ 
                pt:2, 
                pb:2,
                pl:'5px',
                display: 'flex'
            }}
        >
            <Box>
                <Link to={`/books/${review.googleApiId}`}>
                    <div 
                        className="book-thumb-container" 
                        style={{
                            width: '80px',
                            minWidth: '80px',
                            marginRight: '10px',
                            float: 'none',
                        }}
                    >
                        <img 
                            src={(review.book.imageLinks && review.book.imageLinks.thumbnail) ? review.book.imageLinks.thumbnail : '/default_book_cover.jpg'}
                            alt={review.book.title} 
                            style={{
                                boxSizing: 'border-box',
                                width: '100%',
                                fontSize: '10px'
                            }}
                        />
                    </div>
                </Link>
            </Box>
            <Box>
                <Box 
                    sx={{
                        display: {
                            lg:"flex",
                            md:"flex",
                            sm:"flex",
                            xs:"block"
                        },
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box 
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <StyledLink to={`/books/${review.googleApiId}`}>
                           <Typography 
                                component="div" 
                                variant="h6" 
                                color='textPrimary' 
                                gutterBottom
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                    marginRight: '5px',
                                    overflow: 'hidden', 
                                    fontFamily: "'Merriweather', serif"
                                }}
                            >
                                {review.book.title}
                            </Typography> 
                        </StyledLink>
                        <Rating 
                            name="half-rating-read" 
                            value={review.rating} precision={0.5} 
                            readOnly
                            size="small"
                            sx={{
                                color: '#ff9900', 
                                fontSize: '0.75rem',
                                paddingTop: '4px'
                            }}
                        />
                    </Box>
                    <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        gutterBottom
                    >
                        {getFullDate(review.date)}
                    </Typography>
                </Box>
                <Typography
                    color="textPrimary"
                    variant="body2"
                    gutterBottom
                >
                    {review.text}
                </Typography>
            </Box>
        </Box>
    )
}

export default ImageReview