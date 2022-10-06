import { connect } from 'react-redux'
import React, { useState} from "react"
import { updateProfile } from '../../actions/profile/updateProfile'

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    Alert
  } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const UserProfileDetails = ({
  profile: {profile, isLoading, success, error},
  updateProfile
}) => {
  const [formData, setFormData] = useState({
      bio: profile.bio,
      twitter: profile.links.twitter, 
      facebook: profile.links.facebook, 
      youtube: profile.links.youtube, 
      instagram: profile.links.instagram,
      website: profile.links.website, 
      country: profile.location.country,
      state: profile.location.state,
      city: profile.location.city
  });

  const { 
      bio, 
      twitter, 
      facebook, 
      youtube, 
      instagram,
      website, 
      country,
      state,
      city,
  } = formData;
  
  const onChange = (e) => {
      e.preventDefault()
      setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onUpdateProfile = async (e) => {
      e.preventDefault();
      const profileFields = {
          bio,
          location: {
              country,
              state,
              city
          },
          links: {
              twitter,
              facebook,
              website,
              instagram,
              youtube
          }    
      }
      updateProfile(profileFields)
  }

  return (
    <>
      <Card>
        <CardHeader
          sx={{pb: 1}}
          title='Links'
        />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                size="small"
                fullWidth
                label="Website"
                name="website"
                onChange={onChange}
                value={website}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                size="small"
                label="Facebook Username"
                name="facebook"
                onChange={onChange}
                value={facebook}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                size="small"
                fullWidth
                label="Twitter Username"
                name="twitter"
                onChange={onChange}
                value={twitter}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                size="small"
                label="Youtube Username"
                name="youtube"
                onChange={onChange}
                value={youtube}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                size="small"
                label="Instagram Username"
                name="instagram"
                onChange={onChange}
                value={instagram}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card
        sx={{mt:2}}    
      >
        <CardHeader
          title='Location'
          subheader='Your location will help you to find books and people around you faster'
          sx={{pb: 1}}
        />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                key="Country"
                size="small"
                label="Country"
                name="country"
                onChange={onChange}
                value={country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                key="State"
                size="small"
                label="State"
                name="state"
                onChange={onChange}
                value={state}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                key="City"
                size="small"
                label="City"
                name="city"
                onChange={onChange}
                value={city}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card
        sx={{mt:2}}    
      >
        <CardHeader
          sx={{pb: 1}}
          title='Bio'
        />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                size="small"
                multiline
                rows={4}
                label="Bio"
                name="bio"
                onChange={onChange}
                value={bio}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 3,
            pt:0
          }}
        >
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
            onClick={onUpdateProfile}
            loading={isLoading.updateFields}
            disabled={isLoading.updateFields}
            size="small"
          >
            Save All Changes
          </LoadingButton>
        </Box>
        {Boolean(success.updateFields) && <Alert severity="success">{success.updateFields}</Alert>}
        {Boolean(error.updateFields) && <Alert severity="warning">{error.updateFields}</Alert>}
      </Card>
    </>
  );
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {updateProfile})(UserProfileDetails);