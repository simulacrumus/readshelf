import { Card, CardContent, Box, Rating, Typography, Divider } from "@mui/material";
import React, {useState} from "react"
import { connect } from "react-redux";
import { getMonthAndYear } from "../../utils/getDates";
import StyledLink from "../layout/StyledLink"
const BookDetails= ({
    books:{currentBook}
}) => {
    const {
        title, 
        authors, 
        publishedDate, 
        pageCount,
        averageRating,
        description,
        language,
        industryIdentifiers,
        categories,
        publisher
    } = currentBook

    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    const bookDescription = description && (isReadMore ? description.substring(0,500).concat("... ") : description)

    return(
        <>
            <Card>
                <CardContent>
                    <Typography 
                        component="div" 
                        variant="h5" 
                        color='textPrimary' 
                        gutterBottom
                        sx={{overflow: 'hidden', fontFamily: "'Merriweather', serif"}}
                    >
                        {title}
                    </Typography>
                    <Box sx={{display:"flex"}}>
                        {(authors && authors.map((author, i, authors) => 
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="body2"
                                key={author}
                            >
                                {i === 0 && 'by'}
                                &nbsp;<StyledLink to={`/search/${author}`}>{author}</StyledLink>
                                {(authors.length !== 1 && i+1 !== authors.length) && ","}
                            </Typography>
                        ))}
                    </Box>
                    {/* CATEGORY */}
                    <Box sx={{display:"flex"}}>
                        {categories && 
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="body2"
                                display="inline"
                                key={categories[0]}
                            >
                                {categories[0]}
                            </Typography>
                        }
                    </Box>

                    {/* RATING */}
                    <Box sx={{display: 'flex'}}>
                        <Rating 
                            value={averageRating ? averageRating : 0} 
                            precision={0.5} 
                            readOnly
                            size="small"
                            sx={{color: '#ff9900'}}
                        />
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            &nbsp;{averageRating}
                        </Typography>
                    </Box>
                    {/* DESCRIPTION */}
                    {description &&
                        <Typography
                            dangerouslySetInnerHTML={{ 
                                __html: bookDescription
                            }}
                            id="book-description"
                            color="textPrimary"
                            gutterBottom
                            variant="body2"
                            sx={{display: 'inline'}}
                        />
                    }
                    {description && description.length > 500 &&
                        <Typography 
                            gutterBottom
                            variant="body2"
                            onClick={toggleReadMore}
                            sx={{
                                color: '#00635d',
                                cursor: 'pointer',
                                display: 'inline',
                                fontWeight: 'bold',
                            }}
                        >
                            {isReadMore ? "read more" : " (show less)"}
                        </Typography>
                    }
                    
                    <Divider sx={{mt: 2, mb: 2}}/>

                    {/* LANGUAGE */}
                    {language &&
                        <Typography
                            color="textSecondary"
                            variant="body2"
                            gutterBottom
                        >
                            Language: {language.toUpperCase()}
                        </Typography>
                    }
                    
                    {/* PAGE COUNT */}
                    {pageCount &&
                        <Typography
                            color="textSecondary"
                            variant="body2"
                            gutterBottom
                        >
                            {pageCount} pages
                        </Typography>
                    }
                    
                    {/* DATE */}
                    <Typography
                        color="textSecondary"
                        variant="body2"
                        gutterBottom
                    >
                        {publishedDate && 
                            `Published in ${getMonthAndYear(publishedDate)}`}
                    </Typography>

                    {/* PUBLISHER */}
                    {publisher &&
                        <Typography
                            color="textSecondary"
                            variant="body2"
                            gutterBottom
                        >
                            Publisher: {publisher}
                        </Typography>
                    }
                    {/* ISBN */}
                    <Box sx={{display:"flex"}}>
                        {(industryIdentifiers && industryIdentifiers.map((isbn, i, industryIdentifiers) => 
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                                key={isbn.identifier}
                            >
                                {i === 0 && 'ISBN:'}
                                &nbsp;{isbn.identifier}
                                {(industryIdentifiers.length !== 1 && i+1 !== industryIdentifiers.length) && ","}
                            </Typography>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

const mapStateToProps = state => ({
    books: state.books
});

export default connect(mapStateToProps)(BookDetails)