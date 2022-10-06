import { connect } from 'react-redux'
import React from "react"
import {
    Box
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import StyledExternalLink from '../layout/StyledExternalLink';

const ProfileSocialLinks = ({
    profile: {profile}
}) => {
    return(
        <Box
            sx={{display: 'flex', justifyContent: 'center', pt: '10px'}}
        >
            {
                (profile.links && profile.links.facebook && profile.links.facebook.trim()) &&
                <StyledExternalLink 
                    style={{padding: '0 5px'}} 
                    href={`https://www.facebook.com/${profile.links.facebook}`}
                >
                    <FacebookIcon/>
                </StyledExternalLink>
            }
            {
                (profile.links && profile.links.twitter && profile.links.twitter.trim()) &&
                <StyledExternalLink 
                    style={{padding: '0 5px'}} 
                    href={`https://www.twitter.com/${profile.links.twitter}`}>
                    <TwitterIcon/>
                </StyledExternalLink>
            }
            {
                (profile.links && profile.links.instagram && profile.links.instagram.trim()) &&
                <StyledExternalLink 
                    style={{padding: '0 5px'}} 
                    href={`https://www.instagram.com/${profile.links.instagram}`}>
                    <InstagramIcon/>
                </StyledExternalLink>
            }
            {
                (profile.links && profile.links.youtube && profile.links.youtube.trim()) &&
                <StyledExternalLink 
                    style={{padding: '0 5px'}} 
                    href={`https://www.youtube.com/${profile.links.youtube}`}>
                    <YouTubeIcon/>
                </StyledExternalLink>
            }
            {
                (profile.links && profile.links.website && profile.links.website.trim()) &&
                <StyledExternalLink 
                    style={{padding: '0 5px'}} 
                    href={profile.links.website}>
                    <LanguageIcon/>
                </StyledExternalLink>
            }
        </Box>
    )
}

const mapStateToProps = state => ({
    profile: state.publicProfile
});

export default connect(mapStateToProps)(ProfileSocialLinks);