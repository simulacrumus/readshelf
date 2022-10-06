import React, {useState, useEffect} from "react" 
import ImageReview from './ImageReview'
import { 
    Card, 
    CardContent, 
    Box, 
    Typography, 
    TextField, 
    MenuItem, 
    Select, 
    FormControl, 
    Divider
} from "@mui/material";

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

const UserReviews = ({reviews}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    const [userReviews, setUserReviews] = useState(reviews) 

    const [searchKey, setSearchKey] = useState('')

    const [sortOption, setSortOption] = useState(sortOptions[0])

    const sortReviews = (option) => {
        switch(option){
            case DATE_NEWEST:
                setUserReviews([...userReviews].sort((r1, r2) => {
                    return new Date(r2.date).getTime() - new Date(r1.date).getTime()
                }))
                break;
            case DATE_OLDEST:
                setUserReviews([...userReviews].sort((r1, r2) => {
                    return new Date(r1.date).getTime() - new Date(r2.date).getTime()
                }))
                break;
            case TITLE_ALPH:
                setUserReviews([...userReviews].sort((r1, r2) => {
                    return r1.book.title.toUpperCase().localeCompare(r2.book.title.toUpperCase())
                }))
                break;
            case RATING_HIGHEST:
                setUserReviews([...userReviews].sort((r1, r2) => {
                    return r2.rating - r1.rating
                }))
                break;
            case RATING_LOWEST:
                setUserReviews([...userReviews].sort((r1, r2) => {
                    return r1.rating - r2.rating
                }))
                break;
            default:
                setUserReviews([...userReviews].sort((r1, r2) => {
                    return new Date(r2.date).getTime() - new Date(r1.date).getTime()
                }))
        }
    }

    const onSearchKeyChange = (e) => {
        e.preventDefault()
        setSearchKey(e.target.value)
        setUserReviews(reviews.filter(review => {
            return review.book.title.toLowerCase().includes(e.target.value.toLowerCase()) 
            || review.text.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }

    const onSortChange = (e) => {
        e.preventDefault();
        setSortOption({...sortOption, value: e.target.value})
        sortReviews(e.target.value)
    }

    const actions = (
        <>
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
                        placeholder="Search in reviews"
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
        </>
    )
    
    return(
        <>
            <Card>
                <CardContent
                    sx={{pt:1}}
                >
                    <Box>
                        {actions}
                    </Box>
                    <Divider sx={{pt: 1}}/>
                    <div className='books-search-results'>
                        {reviews && (userReviews.map(review => {
                            return <ImageReview key={review.googleApiId} review={review} />
                        }))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default UserReviews;