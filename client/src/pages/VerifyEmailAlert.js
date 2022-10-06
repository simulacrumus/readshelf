import React, { useEffect } from "react"
import { connect } from "react-redux";
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";
import {resendEmailVerification} from "../actions/authentication/resendEmailVerification";
import { Navigate } from 'react-router-dom';

const VerifyEmailAlert = ({
    auth: {error, success, isLoading, emailVerified, isAuthenticated}, resendEmailVerification
}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const onResendVerification = (e) => {
        e.preventDefault()
        resendEmailVerification()
    }

    if ( Boolean(emailVerified) ){
        return <Navigate to="/home"/>
    }

    if(!Boolean(isAuthenticated)){
        return <Navigate to="/login"/>
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
                                <Box sx={{ my: 3 }}>
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h4"
                                        sx={{textAlign: 'center'}}
                                    >
                                        Please verify your email to continue
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        py:2,
                                    }}
                                >
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                        sx={{textAlign: 'center'}}
                                    >
                                        {!error.sendVerificationEmail && !success.sendVerificationEmail ? 'Did not receive a verification email?' : ''}
                                    </Typography>
                                    <LoadingButton
                                        fullWidth
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        onClick={onResendVerification}
                                        loading={isLoading.sendVerificationEmail}
                                        disabled={error.sendVerificationEmail || success.sendVerificationEmail || isLoading.sendVerificationEmail}
                                    >
                                        {error.sendVerificationEmail || success.sendVerificationEmail || 'Resend verification email'}
                                    </LoadingButton>
                                </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {resendEmailVerification})(VerifyEmailAlert)