import { Box, Typography, Card, CardHeader, CardContent, IconButton, Modal, Button } from "@mui/material";
import React, {useState} from "react" 
import { connect } from "react-redux"; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import PostReview from './PostReview'
import Review from './Review'
import { deleteReview } from '../../actions/review/deleteReview'

const UserReview = ({ 
    books: { currentBook },
    profile: { profile },
    deleteReview
}) => {

    const reviewed = currentBook && profile.reviews && profile.reviews.some(r => r.googleApiId === currentBook.googleApiId)
    
    const review = reviewed && currentBook.reviews.find(r => r.user._id === profile.user._id)

    const [toggleEdit, setToggleEdit] = useState(reviewed)

    const [toggleModal, setToggleModal] = useState(false)

    const onToggleEdit = (e) => {
        setToggleEdit(!toggleEdit)
    }

    const onToggleModal = (e) => {
        setToggleModal(!toggleModal)
    }

    const onToggleOff = (e) => {
        setToggleEdit(true)
    }

    const onDeleteReview = (e) => {
        e.preventDefault()
        setToggleModal(false)
        setToggleEdit(false)
        deleteReview(review._id)

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: {
            lg: '57%',
            md: '53%',
            sm: '50%',
            xs: '50%'
        },
        transform: 'translate(-50%, -50%)',
        width: {
            lg: '500px',
            md: '400px',
            sm: '350px',
            xs: '300px'
        },
        bgcolor: 'background.paper',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const editIcon =(  
        <>
            <Modal
                open={toggleModal}
                onClose={onToggleModal}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                BackdropProps={{timeout: 0,}}
            >
                <Box sx={{ ...style}}>
                    <Typography 
                        component="div" 
                        variant="h6" 
                        color='textPrimary' 
                        gutterBottom
                        sx={{pb: 2}}
                    >
                        Are you sure you want to delete your review? You cannot undo this.
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            aria-label="cancel"
                            onClick={onToggleModal}
                            size="small"
                            sx={{mr: 1}}
                        >
                            Cancel
                        </Button>
                        <Button
                            aria-label="delete"
                            onClick={onDeleteReview}
                            size="small"
                            variant="contained"
                            color="error"
                        >
                            Delete
                        </Button>
                        
                    </Box>
                </Box>
            </Modal>
            <IconButton 
                aria-label="edit"
                onClick={onToggleEdit}
                size="small"
                sx={{fontSize: "13px"}}
            >
                <EditIcon sx={{fontSize: "1rem"}}/>
                Edit
            </IconButton>
            <IconButton 
                aria-label="edit"
                onClick={onToggleModal}
                size="small"
                sx={{fontSize: "13px"}}
            >
                <DeleteIcon sx={{fontSize: "1rem"}}/>
                Delete
            </IconButton>
        </>
    )
    const cancelIcon=(
        <IconButton 
            aria-label="cancel"
            onClick={onToggleEdit}
            size="small"
            sx={{fontSize: "13px"}}
        >
            <ClearIcon sx={{fontSize: "1rem"}}/>
            Cancel
        </IconButton>
    )
    return(
        <Card
            sx={{mt:2}}
        >
            <CardHeader
                title={"My Review"}
                action={
                    (reviewed && toggleEdit) ? editIcon : (reviewed && !toggleEdit) && cancelIcon
                }
                sx={{mb:0, pb:0}}
            />
            <CardContent
                sx={{mb:1, pt:1}}
            >                               
                { (reviewed && toggleEdit) ? <Review review={review} key={review.id}/> : <PostReview review={reviewed && review} onAction={onToggleOff}/>}
            </CardContent>
        </Card>
    )
}

const mapStateToProps = state => ({
    books: state.books,
    profile: state.profile
});

export default connect(mapStateToProps, {deleteReview})(UserReview)