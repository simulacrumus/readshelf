import React, { useEffect } from "react"
import { connect } from "react-redux";
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { verifyEmail } from "../actions/authentication/verifyEmail";
import { useNavigate } from 'react-router-dom';
import { useQueryParams} from "../utils/useQueryParams";


const VerifyEmail = ({
    auth: {emailVerified, error, success},
    verifyEmail
}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { code } = useQueryParams()
    const navigate = useNavigate();

    useEffect(() => {
        verifyEmail(code)
    }, [verifyEmail, code])

    useEffect(() => {
        if(emailVerified){
            setTimeout(() => {
                navigate('/')
            }, 3000);
        }
    }, [ navigate, emailVerified])

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
                                    {error.verifyEmail || success.verifyEmail}
                                </Typography>
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

export default connect(mapStateToProps, {verifyEmail})(VerifyEmail)