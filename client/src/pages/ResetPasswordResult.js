import { connect } from 'react-redux'
import React, { useEffect } from "react"
import { Link, Navigate} from 'react-router-dom'
import { Box, Button, Container, Typography, Card, CardContent } from '@mui/material';

const ResetPasswordResult = ({
    auth: {isAuthenticated, error, success}
}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (isAuthenticated) {
        return <Navigate to="/" />;
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
                                    Reset Password
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="body2"
                                    sx={{pt: 3, pb: 3}}
                                >
                                    {error.resetPassword || success.resetPassword}
                                </Typography>
                                <Link
                                    to='/login'
                                    style={{textDecoration: 'none'}}
                                >
                                    <Button
                                        sx={{mt: 1}}
                                        size="small"
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                    >
                                        Go to sign in
                                    </Button>
                                </Link>
                            </Box>
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

export default connect(mapStateToProps)(ResetPasswordResult);