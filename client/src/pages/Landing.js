import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from 'react-redux'
import Footer from '../components/layout/Footer'

const Landing = ({
    auth: {isAuthenticated}
}) => {

    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    const onClick = (e) => {
        e.preventDefault()
        navigate("/signup", { replace: true });
    }

    return(   
        <Box sx={{
            position: 'relative',
            background: 'url(\'bookshelf.jpg\') no-repeat center center/cover fixed',
            height: '100vh',
            mt: -13
        }}>
            <Box sx={{
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(0deg,transparent 50%,rgba(0,0,0,.7)),radial-gradient(50% 100%,transparent 0,rgba(0,0,0,.7) -10%)'
            }}>
                <Container maxWidth="md" sx={{
                    color: '#fff',
                    height: '100%',
                    width: '80%',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}>
                <Typography
                    color="#fff"
                    variant="h1"
                >
                    Find your next favorite read
                </Typography>
                <Typography
                    color="#fff"
                    variant="body1"
                >
                    Keep your readings orginized, rate your books and share your ideas
                </Typography>
                <Button
                    color="primary"
                    size="medium"
                    type="submit"
                    variant="contained"
                    onClick={onClick}
                    sx={{mt:2}}
                >
                    Get Started
                </Button>
                <Footer/>
                </Container>
            </Box>

        </Box>  
)}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Landing);