import React, {useEffect, useState} from "react"
import BookCard from './BookCard'
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    TextField, 
    FormControl, 
    Select, 
    MenuItem, 
    Divider 
} from '@mui/material';

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

const BookList = ({books}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
    
    const [bookList, setBookList] = useState(books) 

    const [searchKey, setSearchKey] = useState('')

    const [sortOption, setSortOption] = useState(sortOptions[0])

    const sortBookList = (option) => {
        switch(option){
            case DATE_NEWEST:
                setBookList([...bookList].sort((b1, b2) => {
                    return new Date(b2.publishedDate.toString()).getTime() - new Date(b1.publishedDate.toString()).getTime()
                }))
                break;
            case DATE_OLDEST:
                setBookList([...bookList].sort((b1, b2) => {
                    return new Date(b1.publishedDate.toString()).getTime() - new Date(b2.publishedDate.toString()).getTime()
                }))
                break;
            case TITLE_ALPH:
                setBookList([...bookList].sort((b1, b2) => {
                    return b1.title.toLowerCase().localeCompare(b2.title.toLowerCase())
                }))
                break;
            case RATING_HIGHEST:
                setBookList([...bookList].sort((b1, b2) => {
                    return b2.averageRating - b1.averageRating
                }))
                break;
            case RATING_LOWEST:
                setBookList([...bookList].sort((b1, b2) => {
                    if(!b1.averageRating) b1.averageRating = 0
                    if(!b2.averageRating) b2.averageRating = 0
                    return b1.averageRating - b2.averageRating
                }))
                break;
            default:
                setBookList([...bookList].sort((b1, b2) => {
                    return new Date(b2.publishedDate.toString()).getTime() - new Date(b1.publishedDate.toString()).getTime()
                }))
        }
    }

    const onSearchKeyChange = (e) => {
        e.preventDefault()
        setSearchKey(e.target.value)
        setBookList(books.filter(book => {
            return book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                book.authors.some(author => author.toLowerCase().includes(e.target.value.toLowerCase()))
        }))
    }

    const onSortChange = (e) => {
        e.preventDefault();
        setSortOption({...sortOption, value: e.target.value})
        sortBookList(e.target.value)
    }

    const actions = (
        <>
            <Box
                sx={{display: { xs: 'block', md: 'flex' }, justifyContent:"space-between"}}
            >
                <Box>
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={searchKey}
                        onChange={onSearchKeyChange}
                        placeholder="Search"
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
                        sx={{pt: 1, mr: 2, display: { xs: 'none', md: 'flex' } }}
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
    return (
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
                        {bookList.map(book => {
                            return <BookCard book={book} key={book.googleApiId}/>
                        })}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default BookList