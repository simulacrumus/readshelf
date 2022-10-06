import { Card, CardContent, CardHeader } from "@mui/material";
import React, {} from "react"
import { connect } from "react-redux";  
import Review from './Review'

const BookReviews = ({
    books: {currentBook}, 
    profile:{profile}
}) => {
    const reviews = currentBook.reviews && currentBook.reviews.filter(review => {
                        return !profile.reviews.some(r => review._id === r._id)
                    })
    return(
        !currentBook.reviews ? <></> :
            <Card
                sx={{mt:2}}
            >
                <CardHeader
                    subheader={Boolean(!reviews || reviews.length === 0) && "There are no reviews for this book"}
                    title="Reviews From Other Users"
                    sx={{mb:1, pb:1}}
                />
                <CardContent
                    sx={{mb:1, pt:1}}
                >                               
                    {
                    reviews &&
                        reviews
                            .sort((r1, r2) => {
                                return new Date(r2.date.toString()) - new Date(r1.date.toString())
                            })
                            .map(review => {
                                return <Review review={review} key={review.text}/>
                            })
                    }
                </CardContent>
            </Card>
    )
}

const mapStateToProps = state => ({
    books: state.books,
    profile: state.profile
});

export default connect(mapStateToProps)(BookReviews)