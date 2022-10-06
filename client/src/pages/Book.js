import { connect } from 'react-redux'
import React, { useEffect } from "react"
import { Container, Grid } from '@mui/material';
import { getBookByGoogleBooksApiId } from '../actions/book/getBook'
import Loading from '../components/layout/Loading';
import BookImageAndActions from '../components/book/BookImageAndActions';
import BookDetails from '../components/book/BookDetails';
import { useParams } from 'react-router-dom'
import BookReviews from '../components/reviews/BookReviews';
import UserReview from '../components/reviews/UserReview';

const Book = ({
    getBookByGoogleBooksApiId, 
    books:{isLoading, currentBook}
}) => {
    const { id } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0)
        getBookByGoogleBooksApiId(id)
    }, [ getBookByGoogleBooksApiId, id]);
    return(
        Boolean(isLoading.currentBook) || currentBook === null ?
            <Loading />
            :
            <Container maxWidth="md">
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={3}
                        md={3}
                        sm={4}
                        xs={12}
                    >
                        {/* BOOK IMAGE AND ACTIONS */}
                        <BookImageAndActions />
                    </Grid>
                    <Grid
                        item
                        lg={9}
                        md={9}
                        sm={8}
                        xs={12}
                    >
                        {/* BOOK DETAILS */}
                        <BookDetails />
                        <UserReview />
                        <BookReviews />
                    </Grid>
                </Grid>
            </Container>
    );
};

const mapStateToProps = state => ({
    profile: state.profile,
    books: state.books,
});

export default connect(mapStateToProps, {getBookByGoogleBooksApiId})(Book);