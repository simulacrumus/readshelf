import React, {useEffect} from "react"
import { connect } from "react-redux";
import RecentlyViewedBooks from '../components/book/RecentlyViewedBooks'
import UserReviews from "../components/reviews/UserReviews";
import GridLayout from "../components/layout/GridLayout";
import EmptyListBox from "../components/layout/EmptyListBox";
import { Typography, Container} from '@mui/material';

const Reviews = ({ profile:{profile} }) => {
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
                    Reviews
                </Typography>
            </Container>
        )
    }

    const ReviewsComponent = () => {
        return(
            <UserReviews reviews={profile.reviews} title='Reviews'/>
        )
    }

    const EmptyList = () => {
        return(
            <EmptyListBox message={"You have not reviewed any book yet"}/>
        )
    }

    return (
        <>
            <Title/>
            <GridLayout
                leftComponent={profile.reviews.length > 0 ? ReviewsComponent : EmptyList }
                rightComponent={RecentlyViewedBooks}
            />
        </>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(Reviews)