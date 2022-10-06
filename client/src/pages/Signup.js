import React, { useState, useEffect } from "react"
import { Link} from 'react-router-dom'
import { signup } from '../actions/authentication/signup'
import { connect } from "react-redux";
import { Navigate } from "react-router";
import { getGoogleOAuthURL } from "../actions/authentication/getGoogleOAuthURL"
import { Box, Button, Container, TextField, Typography, Card, CardContent } from '@mui/material';
import { resetAllAlerts } from "../actions/errors";
import { Google as GoogleIcon } from '../icons/google';

const Signup = ({
  auth: {isAuthenticated, error, googleOAuthURL, isLoading}, 
  signup,
  getGoogleOAuthURL,
  resetAllAlerts
} ) => {
  useEffect(() => {
    resetAllAlerts()
    window.scrollTo(0, 0)
  }, [resetAllAlerts])

  useEffect(() => {
    getGoogleOAuthURL()
  }, [getGoogleOAuthURL]);
  
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
      e.preventDefault();
      signup(formData)
  }

  const onFocus = e => {
    resetAllAlerts()
  }

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
            marginTop: '5%'
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
                        Sign up
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
                    Continue with Google
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
                    error={Boolean(error.firstName)}
                    fullWidth
                    helperText={error.firstName && error.firstName}
                    label="First Name"
                    margin="normal"
                    name="firstName"
                    onChange={onChange}
                    value={firstName}
                    variant="outlined"
                    onFocus={onFocus}
                  />
                  <TextField
                    error={Boolean(error.lastName)}
                    fullWidth
                    helperText={error.lastName && error.lastName}
                    label="Last Name"
                    margin="normal"
                    name="lastName"
                    onChange={onChange}
                    value={lastName}
                    variant="outlined"
                    onFocus={onFocus}
                  />
                  <TextField
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
                  <TextField
                    error={Boolean(error.confirmPassword)}
                    fullWidth
                    helperText={error.confirmPassword && error.confirmPassword}
                    label="Confirm Password"
                    margin="normal"
                    name="confirmPassword"
                    onChange={onChange}
                    type="password"
                    value={confirmPassword}
                    variant="outlined"
                    onFocus={onFocus}
                  />
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      disabled={isLoading.register}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Register
                    </Button>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Alredy have an account?
                    {' '}
                      <Link
                          to='/login'
                          className='auth-links'
                          variant="subtitle2"
                          underline="hover"
                      >
                          Sign In
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

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {signup, resetAllAlerts, getGoogleOAuthURL})(Signup)