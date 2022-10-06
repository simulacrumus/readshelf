import React from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Typography, Card,Divider, CardContent, CardHeader} from '@mui/material';

const RecentlyViewedBooks = ({
    profile: {profile}
}) => {
    return(
        !profile || !profile.recentlyViewedBooks ? <></> :
        <Card >
            <CardHeader
                sx={{pb:0}}
                title="Recently Viewed Books"
            />
            <CardContent
                sx={{pt:2}}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {profile.recentlyViewedBooks &&
                        profile.recentlyViewedBooks.slice(-10).reverse().map(book =>
                            <Box sx={{mt:1, mb: 1}} key={book.googleApiId}>
                                <Link 
                                    to={`/books/${book.googleApiId}`} 
                                    style={{
                                        textDecoration:'none',
                                        "&:hover": {
                                            textDecoration:'underline'
                                        }
                                    }}
                                >
                                    <Box>
                                          <Typography
                                            color="textPrimary"
                                            variant="h6"
                                            sx={{fontWeight: 'bold', fontSize: "12px"}}
                                        >
                                            {book.title}
                                        </Typography>
                                        <Box sx={{display:"flex"}}>
                                            {(book.authors && book.authors.map((author, i, authors) => 
                                                <Typography
                                                    color="textSecondary"
                                                    gutterBottom
                                                    variant="subtitle2"
                                                    key={author.toString()}
                                                    sx={{fontSize: '11px'}}
                                                >
                                                    {i === 0 && 'by'}
                                                    &nbsp;{author.toString()}
                                                    {(authors.length !== 1 && i+1 !== authors.length) && ","}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                </Link>
                            </Box>
                        )
                    }
                </Box>
            </CardContent>
            <Divider />
      </Card>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(RecentlyViewedBooks)