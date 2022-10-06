import React, {useState, useEffect} from "react"
import { connect } from "react-redux";
import RecentlyViewedBooks from '../book/RecentlyViewedBooks'
import {
    Box, 
    Container, 
    Typography, 
    Grid, 
    TextField, 
    MenuItem, 
    Select, 
    FormControl
} from "@mui/material";
import Reviews from "./UserReviews";

const DATE_NEWEST = "DATE_NEWEST"
const DATE_OLDEST = "DATE_OLDEST"
const TITLE_ALPH = "TITLE_ALPH"
const RATING_HIGHEST = "RATING_HIGHEST"
const RATING_LOWEST = "RATING_LOWEST"

const sortOptions = [
        {
            value: DATE_NEWEST,
            label: 'Date: Newest First',
        },
        {
            value: DATE_OLDEST,
            label: 'Date: Oldest First',
        },
        {
            value: TITLE_ALPH,
            label: 'Title: Alphabetically',
        },
        {
            value: RATING_HIGHEST,
            label: 'Rating: Highest First',
        },
        {
            value: RATING_LOWEST,
            label: 'Rating: Lowest First',
        },
    ];

const MyReviews = ({
    profile:{profile},
}) => {
    useEffect(() => {
        sortMyReviews(DATE_NEWEST)
        window.scrollTo(0, 0)
    }, [])

    const [myReviews, setMyReviews] = useState(profile.reviews) 

    const [searchKey, setSearchKey] = useState('')

    const [sortOption, setSortOption] = useState(sortOptions[0])

    const sortMyReviews = (option) => {
        switch(option){
            case DATE_NEWEST:
                setMyReviews([...myReviews].sort((r1, r2) => {
                    return new Date(r2.date).getTime() - new Date(r1.date).getTime()
                }))
                break;
            case DATE_OLDEST:
                setMyReviews([...myReviews].sort((r1, r2) => {
                    return new Date(r1.date).getTime() - new Date(r2.date).getTime()
                }))
                break;
            case TITLE_ALPH:
                setMyReviews([...myReviews].sort((r1, r2) => {
                    return r1.book.title.toUpperCase().localeCompare(r2.book.title.toUpperCase())
                }))
                break;
            case RATING_HIGHEST:
                setMyReviews([...myReviews].sort((r1, r2) => {
                    return r2.rating - r1.rating
                }))
                break;
            case RATING_LOWEST:
                setMyReviews([...myReviews].sort((r1, r2) => {
                    return r1.rating - r2.rating
                }))
                break;
            default:
                setMyReviews([...myReviews].sort((r1, r2) => {
                    return new Date(r2.date).getTime() - new Date(r1.date).getTime()
                }))
        }
    }

    const onSearchKeyChange = (e) => {
        e.preventDefault()
        setSearchKey(e.target.value)
        setMyReviews(profile.reviews.filter(review => {
            return review.book.title.toLowerCase().includes(e.target.value.toLowerCase()) 
            || review.text.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }

    const onSortChange = (e) => {
        e.preventDefault();
        setSortOption({...sortOption, value: e.target.value})
        sortMyReviews(e.target.value)
    }

    const actions = (
        <Box
            sx={{display: { xs: 'block', md: 'flex' }, justifyContent:"space-between"}}
        >
            <Box>
                <TextField
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    value={searchKey}
                    onChange={onSearchKeyChange}
                    placeholder="Search in my reviews"
                    InputProps={{
                        style: {
                            fontSize: "12px"
                        }
                    }}
                    sx={{ 
                        display: 'flex',
                        margin: '10px 0'
                    }}
                />
            </Box>
            <Box
                sx={{pt: 1.25, display: "flex"}}
            >
                <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    sx={{pt: 1, mr: 2, display: { xs: 'none', md: 'flex' }}}
                >
                    Sort by:
                </Typography>
                <FormControl
                    sx={{width: { xs: '100%', md: 'auto'} }}
                >
                    <Select
                        id="demo-simple-select"
                        value={sortOption.value}
                        onChange={onSortChange}
                        size="small"
                        sx={{fontSize: "12px"}}
                    >
                        {sortOptions.map((option) => (
                            <MenuItem 
                                key={option.value} 
                                value={option.value}
                                sx={{fontSize: "12px"}}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
    
    return(
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4,
                }}
            >
                <Container maxWidth="md">
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                            
                        >
                            <Reviews reviews={profile.reviews} />
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <RecentlyViewedBooks />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(MyReviews)