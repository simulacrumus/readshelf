import { Box, Rating, Typography, TextField } from "@mui/material";
import React, {useState} from "react" 
import { connect } from "react-redux"; 
import LoadingButton from '@mui/lab/LoadingButton';
import { addReview } from '../../actions/review/addReview'

const PostReview = ({ 
    books: { currentBook },
    profile: { isLoading },
    addReview,
    review = {rating: undefined, text: ''},
    onAction
}) => {
    const [formData, setFormData] = useState({
        rating: review.rating,
        text: review.text,
        googleApiId: currentBook.googleApiId
    });

    const { 
        rating,
        text
    } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onPostReview = async (e) =>{
        e.preventDefault()
        addReview(formData)
        onAction()
        setFormData({ ...formData, rating: undefined, text: ''});
    }

    return(
        <Box
            sx={{ pt:2, pb:2}}
        >
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Typography 
                    component="div" 
                    variant="body" 
                    color='textPrimary' 
                    gutterBottom
                    sx={{
                        padding: 0,
                        margin: 0,
                        marginRight: '5px',
                        overflow: 'hidden',
                    }}
                >
                    Rating:
                </Typography>
                <Rating 
                    name="rating" 
                    value={rating || 0}
                    sx={{
                        color: '#ff9900',
                    }}
                    onChange={(e, v) => setFormData({...formData, rating: v})}
                />
            </Box>
            <Box
                sx={{
                    p: "10px 0"
                }}
            >
                <TextField
                    fullWidth
                    multiline
                    rows={5}
                    name="text"
                    onChange={onChange}
                    value={text}
                    variant="outlined"
                />
            </Box>
            <Box>
                <LoadingButton
                    sx={{
                        width: {
                            lg:"auto",
                            md:"auto",
                            sm:"auto",
                            xs:"100%"
                        }
                    }}
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={onPostReview}
                    loading={isLoading.postReview}
                    disabled={isLoading.postReview}
                >
                    Post Review
                </LoadingButton>
            </Box>
                
        </Box>
    )
} 

const mapStateToProps = state => ({
    books: state.books,
    profile: state.profile
});

export default connect(mapStateToProps, { addReview })(PostReview)