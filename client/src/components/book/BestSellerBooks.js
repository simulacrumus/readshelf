import React, { useEffect } from "react"
import { connect } from "react-redux";
import { Box, Card,Divider, CardContent, CardHeader} from '@mui/material';
import { Link } from 'react-router-dom';

const BestSellerBooks = ({
    books: { bestSellerBooks }
}) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return(
        !bestSellerBooks ? <></> :
        <Card >
            <CardHeader
                sx={{pb:0}}
                title="Popular Books"
            />
            <CardContent
                sx={{pt:2}}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {xs: '33% 33% 33%', sm: '25% 25% 25% 25%', md: '25% 25% 25% 25%'}
                    }}
                >
                    {bestSellerBooks &&
                        bestSellerBooks.map(book =>
                            <Link to={`/books/${book.googleApiId}`} key={book.googleApiId}>
                                <Box 
                                    sx={{
                                        padding: {xs: '3px', md: '5px', sm:'5px'}
                                    }} 
                                    key={book.title}>
                                        <img 
                                            src={book.book_image} 
                                            alt={book.title}
                                            style={{width: '100%', cursor: 'pointer'}}
                                        />
                                </Box>
                            </Link>
                        )
                    }
                </Box>
            </CardContent>
            <Divider />
      </Card>
    )
}

const mapStateToProps = state => ({
    books: state.books
});

export default connect(mapStateToProps)(BestSellerBooks)