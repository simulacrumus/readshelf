import { connect } from 'react-redux'
import React from "react"
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography,
} from '@mui/material';
import Loading from '../layout/Loading';
import { getFullDate } from '../../utils/getDates'
import ProfileSocialLinks from "./ProfileSocialLinks";
  
const ProfileSummary = ({
    profile: {user, profile}
}) => {
    const avatar = profile && profile.avatar && profile.avatar.ContentType && profile.avatar.Data !== null ? 
    (`data:${profile.avatar.ContentType};base64, ${Buffer.from(profile.avatar.Data.data).toString('base64')}`)
    : '';

    return(
        profile === null ? <Loading/> :
        <Box
            sx={{mt: profile.privateAccount ? 0 : {xs: '10px', md: '73px'} }}
        >
            <Card>
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
                        {`${user.firstName} ${user.lastName}`}
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
                    <ProfileSocialLinks/>
            </CardContent>
        </Card>
        {
            profile.bio &&
            <Card
                sx={{marginTop: 1}}
            >
                <CardContent>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {profile.location.city &&
                            <>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    {profile.bio}
                                </Typography>
                            </>
                        }
                    </Box>
                </CardContent>
            </Card>
        }
      </Box>
    )
}

const mapStateToProps = state => ({
    profile: state.publicProfile
});

export default connect(mapStateToProps)(ProfileSummary);