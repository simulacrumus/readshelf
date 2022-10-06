import { connect } from 'react-redux'
import React, {useState} from "react" 
import {
    Box,
    Button,
    Card,
    CardHeader,
    Modal,
    Typography
} from '@mui/material';
import {deleteUserAccount} from '../../actions/user/deleteUser';
import { logout } from '../../actions/authentication/logout'

const DeleteAccount = ({
    auth: {user},
    profile:{profile},
    deleteUserAccount,
    logout
 }) => {

    const [toggleModal, setToggleModal] = useState(false)

    const onDeleteAccount = (e) => {
        e.preventDefault();
        setToggleModal(false)
        deleteUserAccount()
        logout()
    }

    const onToggleModal = (e) => {
        setToggleModal(!toggleModal)
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

    return (
        <>
        <Card>
            <CardHeader
                sx={{pb: 1}}
                subheader="Delete your account and all of your source data. This is irreversible."
                title="Delete Account"
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    p:3,
                    pt: 2
                }}
            >
                <Button
                    sx={{
                        width: {
                            lg:"auto",
                            md:"auto",
                            sm:"auto",
                            xs:"100%"
                        }
                    }}
                    color="error"
                    variant="outlined"
                    onClick={onToggleModal}
                    size="small"
                >
                    Delete Account
                </Button>
            </Box>
        </Card>
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
                        Are you sure you want to delete your account? You cannot undo this.
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
                            onClick={onDeleteAccount}
                            size="small"
                            variant="contained"
                            color="error"
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { deleteUserAccount, logout} )(DeleteAccount);