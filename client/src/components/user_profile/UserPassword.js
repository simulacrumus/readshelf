import { connect } from 'react-redux'
import React, { useState } from "react"
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
import { updatePassword } from '../../actions/user/updatePassword';

const UserPassword = ({
    updatePassword,
    auth: {isLoading, error, success}
}) => {
    
    const [formData, setFormData] = useState({
        email:'',
        currentPassword: '',
        newPassword: ''
    });

    const { email, currentPassword, newPassword } = formData;

    const onChange = e =>{
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        updatePassword(email, currentPassword, newPassword)
    }

    const onFocus = e => {
        e.preventDefault();
    }

  return (
    <>
        <Card sx={{mb:2}}>
            <CardHeader
                title="Change Password"
            />
            <form onSubmit={onSubmit}>
                <CardContent
                    sx={{pt:1, pb:1}}
                >
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label="Current Email"
                                name="email"
                                onChange={onChange}
                                onFocus={onFocus}
                                value={email}
                                variant="outlined"
                                error={Boolean(error.email)}
                                helperText={Boolean(error.email) ? error.email : 'Current email is required to identify user'}
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
                                label="Current Password"
                                name="currentPassword"
                                onChange={onChange}
                                onFocus={onFocus}
                                type="password"
                                value={currentPassword}
                                variant="outlined"
                                error={Boolean(error.currentPassword)}
                                helperText={Boolean(error.currentPassword) && error.currentPassword}
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
                                label="New Password"
                                name="newPassword"
                                onChange={onChange}
                                onFocus={onFocus}
                                type="password"
                                value={newPassword}
                                variant="outlined"
                                error={Boolean(error.newPassword)}
                                helperText={Boolean(error.newPassword) && error.newPassword}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Box
                    sx={{
                        display: {xs: 'bloc', md:'flex'},
                        justifyContent: 'space-between',
                        p:3,
                        pt: 2
                    }}
                    >
                    <LoadingButton
                        sx={{
                            width: {
                                lg:"auto",
                                md:"auto",
                                sm:"100%",
                                xs:"100%"
                            }
                        }}
                        size="small"
                        color="primary"
                        variant="contained"
                        type="submit"
                        loading={Boolean(isLoading.changePassword)}
                        disabled={Boolean(isLoading.changePassword)}
                    >
                        Change Password
                    </LoadingButton>
                </Box>
            </form>
            <Box>
                {Boolean(error.changePassword) && (
                    <Alert severity="warning">{error.changePassword}</Alert>
                )}
                {Boolean(success.changePassword) && (
                    <Alert severity="success">{success.changePassword}</Alert>
                )}
            </Box>
        </Card>
    </>
  );
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {updatePassword})(UserPassword);