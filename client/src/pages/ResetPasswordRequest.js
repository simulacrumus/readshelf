import { connect } from 'react-redux'
import React, { useState, useEffect } from "react"
import { Link, Navigate} from 'react-router-dom'
import { requestResetPassword } from "../actions/authentication/requestResetPassword"
import { Box, Button, Container, TextField, Typography, Card, CardContent } from '@mui/material';
import { resetAllAlerts } from '../actions/errors';

const ResetPasswordRequest = ({
    requestResetPassword,
    resetAllAlerts,
    auth: {isAuthenticated, error, success, isLoading}
}) => {
    useEffect(() => {
        resetAllAlerts()
        window.scrollTo(0, 0)
    }, [resetAllAlerts])

    const [email, setEmail] = useState('') 

    const onChange = e =>{
        setEmail(e.target.value);
    }

    const onFocus = e => {
        resetAllAlerts()
    }

    const onSubmit = e => {
        e.preventDefault();
        requestResetPassword(email);
    };

    if(Boolean(success.requestResetPassword)){
        return <Navigate to="/request-reset-password/result"/>
    }

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return(
        <>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                    marginTop: '10%'
                }}
            >
                <Container maxWidth="xs">
                    <Card>
                        <CardContent>
                            <form onSubmit={onSubmit}>
                                <Box sx={{ my: 3 }}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h4"
                                    >
                                        Reset Password
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        Just need to confirm your email to send you instructions to reset your password
                                    </Typography>
                                </Box>
                                <TextField
                                    sx={{bgcolor: "#FFF"}}
                                    error={Boolean(error.email)}
                                    fullWidth
                                    helperText={error.email && error.email}
                                    label="Email Address"
                                    margin="normal"
                                    name="email"
                                    onChange={onChange}
                                    type="email"
                                    value={email}
                                    variant="outlined"
                                    onFocus={onFocus}
                                />
                                <Box
                                    sx={{
                                        py:2
                                    }}
                                >
                                    <Button
                                        sx={{}}
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                        onClick={onSubmit}
                                        loading={isLoading.requestResetPassword}
                                    >
                                        Submit
                                    </Button>
                                    <Link
                                        to='/login'
                                        style={{textDecoration: 'none'}}
                                    >
                                        <Button
                                            sx={{mt: 1}}
                                            size="small"
                                            fullWidth
                                            color="primary"
                                            variant="outlined"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {requestResetPassword, resetAllAlerts})(ResetPasswordRequest);