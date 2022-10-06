import { connect } from 'react-redux'
import React from "react"
import {
    FormGroup,
    Card,
    CardContent,
    CardHeader,
    Grid,
    FormControlLabel,
    Switch,
    Typography
  } from '@mui/material';
import {updateAccountPrivacy} from "../../actions/profile/updateAccountPrivacy";
import {updateNewsletterSubscription} from "../../actions/profile/updateNewsletterSubscription";

const UserProfileSettings = ({
    profile: {profile},
    updateNewsletterSubscription,
    updateAccountPrivacy
}) => {

    const onUpdateNewsletter = (e) => {
        updateNewsletterSubscription(e.target.checked)
    }

    const onUpdateAccountPrivacy = (e) => {
        updateAccountPrivacy(e.target.checked)
    }

    return (
        <>
            <Card>
                <CardHeader
                    subheader="You will receive newsletter from us"
                    title="Newsletter"
                />
                <CardContent
                    sx={{pt:1, pb:1}}
                >
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={6}
                        >
                            <Typography
                                color="textPrimary"
                                variant="primary"
                                gutterBottom
                            >
                                Subscribe to newsletter
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={6}
                        >
                            <FormGroup>
                                <FormControlLabel 
                                control={ 
                                    <Switch
                                        checked={Boolean(profile.newsletter)}
                                        onChange={onUpdateNewsletter}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                label={Boolean(profile.newsletter) ? "On" : "Off"} />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card
                sx={{mt: 2}}
            >
                <CardHeader
                    subheader="Choose if other users can see your profile details"
                    title="Private Account"
                />
                <CardContent
                    sx={{pt:1, pb:1}}
                >
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={6}
                        >
                            <Typography
                                color="textPrimary"
                                variant="primary"
                                gutterBottom
                            >
                                Hide my profile details
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={6}
                        >
                            <FormGroup>
                                <FormControlLabel 
                                control={ 
                                    <Switch
                                        checked={Boolean(profile.privateAccount)}
                                        onChange={onUpdateAccountPrivacy}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                label={Boolean(profile.privateAccount) ? "On" : "Off"} />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {updateNewsletterSubscription, updateAccountPrivacy})(UserProfileSettings);