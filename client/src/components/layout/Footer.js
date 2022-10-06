import React from "react"
import { Typography, Box } from '@mui/material';
import StyledExternalLink from './StyledExternalLink'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
    return (
        <Box
            sx={{mt: 10, display: {xs: 'block', md: 'flex'}}}
        >
            <Typography
                color="white"
                variant="subtitle2"
            >
                Project developed by Emrah Kinay
            </Typography>
            <Typography
                color="white"
                variant="subtitle2"
                sx={{display: {xs: 'none', sm: 'none', md: 'flex'}}}
            >
                &nbsp;•&nbsp;
            </Typography>
           <Box
            sx={{mt: {xs: 2, md: 0 }, display: 'flex', justifyContent:'center'}}
           >
            <StyledExternalLink href="https://github.com/simulacrumus/ReadShelf" target="_blank" >
                    <Typography
                        color="white"
                        variant="subtitle2"
                    >
                        &nbsp;GitHub&nbsp;
                        <GitHubIcon sx={{fontSize: '1em'}}/>
                    </Typography>
                </StyledExternalLink>
                <Typography
                    color="white"
                    variant="subtitle2"
                >
                    &nbsp;•&nbsp;
                </Typography>
                <StyledExternalLink href="https://www.linkedin.com/in/emrahkinay/" target="_blank" >
                    <Typography
                        color="white"
                        variant="subtitle2"
                    >
                        LinkedIn&nbsp;
                        <LinkedInIcon sx={{ fontSize: '1em'}}/>
                    </Typography>
                </StyledExternalLink>
           </Box>
        </Box>
    )
}

export default Footer