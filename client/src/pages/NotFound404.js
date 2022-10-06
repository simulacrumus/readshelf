import React, { useEffect } from "react"
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import StyledLink from '../components/layout/StyledLink';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NotFound404 = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
                <Container maxWidth="md">
                    <Card>
                        <CardContent>
                                <Box sx={{ my: 3 }}>
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h4"
                                        sx={{textAlign: 'center'}}
                                    >
                                        Whooops, nothing to see here
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        pt:2,
                                    }}
                                >
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        Sorry, we could not find what you were looking for or the page no longer exist!
                                        You can go back to homepage and see if you can find what you are looking for.
                                    </Typography>
                                    <StyledLink 
                                        to={`/`}
                                    >
                                        <Typography
                                            color="textSecondary"
                                            gutterBottom
                                            variant="subtitle2"
                                            sx={{ display: 'flex', justifyContent: 'flex-end'}}
                                        >
                                            Go home
                                            <ArrowForwardIcon sx={{fontSize: '16px'}}/>
                                        </Typography>
                                    </StyledLink>
                                </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    )
}

export default NotFound404