import { connect } from 'react-redux'
import React, { useState, useEffect } from "react"
import { Navigate} from 'react-router-dom'
import { resetPassword } from "../actions/authentication/resetPassword"
import { Box, Button, Container, TextField, Typography, Card, CardContent } from '@mui/material';
import { useQueryParams } from '../utils/useQueryParams'
import { resetAllAlerts } from '../actions/errors';

const NewPassword = ({
    resetPassword,
    resetAllAlerts,
    auth: {isAuthenticated, error, success}
}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
        resetAllAlerts()
    }, [resetAllAlerts])

    const { code } = useQueryParams();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const {password, confirmPassword} = formData

    const onChange = e =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onFocus = e => {
        resetAllAlerts()
    }

    const onSubmit = e => {
        e.preventDefault();
        resetPassword(code, password, confirmPassword)
    };

    if(Boolean(success.resetPassword)){
        return <Navigate to="/reset-password/result"/>
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
                                        Please enter a new password for your account
                                    </Typography>
                                </Box>
                                <TextField
                                    sx={{bgcolor: "#FFF"}}
                                    error={Boolean(error.newPassword)}
                                    fullWidth
                                    helperText={error.newPassword && error.newPassword}
                                    label="New Password"
                                    margin="normal"
                                    name="password"
                                    onChange={onChange}
                                    type="password"
                                    value={password}
                                    variant="outlined"
                                    onFocus={onFocus}
                                />
                                <TextField
                                    sx={{bgcolor: "#FFF"}}
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
                                    >
                                        Submit
                                    </Button>
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

export default connect(mapStateToProps, {resetPassword, resetAllAlerts})(NewPassword);