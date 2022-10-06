import React, {useEffect} from "react"
import RecentlyViewedBooks from '../components/book/RecentlyViewedBooks';
import { Typography, Container} from '@mui/material';
import { connect } from 'react-redux'
import BookList from '../components/book/BookList';
import GridLayout from "../components/layout/GridLayout";
import EmptyListBox from "../components/layout/EmptyListBox";

const Bookshelf = ({profile: {profile}}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const Title = () => {
        return(
            <Container maxWidth="md">
                <Typography
                    color="textSecondary"
                    variant="h4"
                    sx={{pt: 1, pb: 1}}
                >
                    Bookshelf
                </Typography>
            </Container>
        )
    }

    const BookshelfBooks = () => {
        return(
                <BookList books={profile.myBooks}/>
        )
    }

    const EmptyList = () => {
        return(
            <EmptyListBox message={"Bookshelf is empty"}/>
        )
    }

    return (
        <>  
            <Title />
            <GridLayout
                leftComponent={profile.myBooks.length > 0 ? BookshelfBooks : EmptyList}
                rightComponent={RecentlyViewedBooks}
            />
        </>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(Bookshelf);