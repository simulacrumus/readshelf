import { Box, Rating, Typography } from "@mui/material";
import React, {} from "react" 
import { Link } from "react-router-dom";
import { getFullDate } from '../../utils/getDates'

const Review = ({ review }) => {
    return(
        <Box
            sx={{ pt:2, pb:2}}
        >
            <Box 
                sx={{
                    display: 'flex',
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
                    <Link 
                        to={`/profile/${review.user.username}`} 
                        style={{
                            textDecoration:'none',
                            "&:hover": {
                                textDecoration:'underline'
                            }
                        }}
                    >
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
                            {review.user.firstName} {review.user.lastName}
                        </Typography>       
                    </Link>
                    
                    <Rating 
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
    )
}

export default Review