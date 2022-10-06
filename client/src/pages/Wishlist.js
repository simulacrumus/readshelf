import React, {useEffect} from "react"
import RecentlyViewedBooks from '../components/book/RecentlyViewedBooks';
import { connect } from 'react-redux'
import BookList from '../components/book/BookList';
import GridLayout from "../components/layout/GridLayout";
import EmptyListBox from "../components/layout/EmptyListBox";
import { Typography, Container} from '@mui/material';

const Wishlist = ({profile: {profile}}) => {
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
                    Wishlist
                </Typography>
            </Container>
        )
    }

    const WishListBooks = () => {
        return(
            <BookList books={profile.wishlist} title='Wishlist'/>
        )
    }

    const EmptyList = () => {
        return(
            <EmptyListBox message={"Wishlist is empty"}/>
        )
    }
    return (
        <>
            <Title/>
            <GridLayout
                leftComponent={profile.wishlist.length > 0 ? WishListBooks : EmptyList}
                rightComponent={RecentlyViewedBooks}
            />
        </>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(Wishlist);