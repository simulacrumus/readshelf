import { connect } from 'react-redux'
import React, { useState, useEffect } from "react"
import { Navigate, Link} from 'react-router-dom'
import { login } from "../actions/authentication/login"
import { getGoogleOAuthURL } from "../actions/authentication/getGoogleOAuthURL"
import { Box, Button, Container, TextField, Typography, Alert, Card, CardContent } from '@mui/material';
import { Google as GoogleIcon } from '../icons/google';
import { useNavigate } from 'react-router-dom'
import { useQueryParams} from "../utils/useQueryParams";
import setAuthToken from "../utils/setAuthToken";
import { resetAllAlerts } from '../actions/errors'
import { loadUser } from '../actions/user/loadUser'

const Login = ({
    login,
    getGoogleOAuthURL,
    resetAllAlerts,
    loadUser,
    auth: {isAuthenticated, error, googleOAuthURL, isLoading},
}) => {
    const navigate = useNavigate();

    const { token } = useQueryParams();

    useEffect(() => {
        resetAllAlerts()
        if (token) {
            setAuthToken(token)
            loadUser()
        }
    }, [token, navigate, resetAllAlerts, loadUser]);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;

    const onChange = e =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onFocus = e => {
        resetAllAlerts()
    }

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    useEffect(() => {
        getGoogleOAuthURL()
    }, [getGoogleOAuthURL]);

    const onGoogleLoginClicked = e => {
        e.preventDefault();
        window.location.href = googleOAuthURL.url
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
                            <Box sx={{ my: 3 }}>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    Sign in
                                </Typography>
                            </Box>
                            <Button
                                fullWidth
                                color="error"
                                startIcon={<GoogleIcon />}
                                onClick={ onGoogleLoginClicked }
                                size="large"
                                variant="contained"
                                disabled={!Boolean(googleOAuthURL)}
                            >
                                Sign in with Google
                            </Button>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                                sx={{pt:2, pb:1, textAlign: 'center'}}
                            >
                                or
                            </Typography>
                            <form onSubmit={onSubmit}>
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
                                <TextField
                                    sx={{bgcolor: "#FFF"}}
                                    error={Boolean(error.password)}
                                    fullWidth
                                    helperText={error.password && error.password}
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    onChange={onChange}
                                    type="password"
                                    value={password}
                                    variant="outlined"
                                    onFocus={onFocus}
                                />
                                {Boolean(error.login) && (
                                    <Alert severity="error">{error.login}</Alert>
                                )}
                                <Box sx={{ py: 2 }}>
                                    <Button
                                        color="primary"
                                        disabled={isLoading.login}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    Don&apos;t have an account?
                                    {' '}
                                    <Link
                                        to="/signup"
                                        className='auth-links'
                                        variant="subtitle2"
                                        underline="hover"
                                        sx={{
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Sign Up
                                    </Link>
                                </Typography>
                                
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    Don&apos;t remember password?
                                    {' '}
                                    <Link
                                        to="/request-reset-password"
                                        className='auth-links'
                                        variant="subtitle2"
                                        underline="hover"
                                        sx={{
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Reset Password
                                    </Link>
                                </Typography>
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

export default connect(mapStateToProps, {
    login,
    loadUser,
    getGoogleOAuthURL,
    resetAllAlerts
})(Login);