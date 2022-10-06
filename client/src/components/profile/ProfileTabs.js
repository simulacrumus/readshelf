import React from "react"
import TabPanel from '../layout/TabPanel'
import Reviews from "../reviews/UserReviews";
import BookList from "../book/BookList";
import {Box, Typography} from "@mui/material";
const ProfileTabs = ({
    profile
}) => {
    const ProfileReviews = () => {
        return(
            <Reviews title={"Reviews"} reviews={profile.reviews}/>
        )
    }

    const ProfileWishlist = () => {
        return(
            <BookList title={"Wishlist"} books={profile.wishlist} />
        )
    }

    const ProfileBookshelf = () => {
        return(
            <BookList title={"Books"} books={profile.myBooks} />
        )
    }

    const panels = [
        {
            Component: ProfileReviews,
            text: 'Reviews'
        },
        {
            Component: ProfileWishlist,
            text: 'Wishlist'
        },
        {
            Component: ProfileBookshelf,
            text: 'Bookshelf'
        }
    ]
    return (
        profile.privateAccount ?
        <Box>
            <Typography
                color="textPrimary"
                gutterBottom
                variant="body2"
                sx={{textAlign: 'center', p:2}}
            >
                This account is private
            </Typography>
        </Box>
        :
        <TabPanel children={panels}/>
    );
}

export default ProfileTabs