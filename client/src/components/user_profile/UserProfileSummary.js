import { connect } from 'react-redux'
import React from "react"
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Loading from '../layout/Loading';
import { updateAvatar } from '../../actions/profile/updateAvatar';
import { deleteAvatar } from '../../actions/profile/deleteAvatar';
import {getFullDate} from '../../utils/getDates'
  
const UserProfileSummary = ({
    auth: {user},
    profile: {profile, isLoading}, 
    updateAvatar,
    deleteAvatar
}) => {
    const avatar = profile && profile.avatar && profile.avatar.ContentType && profile.avatar.Data !== null ? 
    (`data:${profile.avatar.ContentType};base64, ${Buffer.from(profile.avatar.Data.data).toString('base64')}`)
    : '';
    const onImageChange = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append('image', e.target.files[0])
        updateAvatar(data)
    }

    const onImageDelete = (e) => {
        e.preventDefault()
        deleteAvatar()
    }
    return(
        profile === null ? <Loading/> :
        <Box
            sx={{mt: {xs: '10px', md: '73px'} }}
        >
            <Card >
                <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        src={avatar}
                        sx={{
                            height: 64,
                            mb: 2,
                            width: 64
                        }}
                    />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        {`${user.firstName || ''} ${user.lastName || ''}`}
                    </Typography>
                    {profile.location.city &&
                        <>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                {profile.location.city}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                {`${profile.location.state}, ${profile.location.country}`}
                            </Typography>
                        </>
                    }
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {`Joined ${getFullDate(user.registerDate)}`}
                    </Typography>
                </Box>
                </CardContent>
                <Divider />
                <CardActions
                    sx={{display: "block"}}

                >
                    <label htmlFor="contained-button-file" style={{width: '100%'}}>
                        <input 
                            type="file" 
                            accept="image/*"
                            id="contained-button-file" 
                            name="contained-button-file" 
                            style={{display: 'none'}}
                            onChange={onImageChange}
                            label='image'
                        />
                        <LoadingButton
                            color="primary"
                            fullWidth
                            variant="contained"
                            component="span"
                            loading={isLoading.updateAvatar}
                            disabled={isLoading.updateAvatar}
                            size="small"
                        >
                            Update Profile Picture
                        </LoadingButton>
                    </label>
                    {avatar && 
                        <LoadingButton
                            color="error"
                            fullWidth
                            variant="outlined"
                            component="span"
                            loading={isLoading.removeAvatar}
                            disabled={isLoading.removeAvatar}
                            size="small"
                            sx={{mt:1}}
                            onClick={onImageDelete}
                        >
                            Remove Picture
                    </LoadingButton>
                    }
                </CardActions>
        </Card>
      </Box>
    )
}

  const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {updateAvatar, deleteAvatar})(UserProfileSummary);