import { connect } from 'react-redux'
import React, {useState} from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Avatar, List, ListItem, MenuItem, ListItemIcon,ListItemText, Container, Drawer, Tooltip} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from '@mui/icons-material/Book';
import ReviewsIcon from '@mui/icons-material/Reviews';
import {logout} from '../../actions/authentication/logout';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Navbar = ({
    profile: {profile},
    auth: {isAuthenticated, user},
    logout,
}) => {

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drawer, setDrawer] = useState(false)
    const [mobileMenuToggle, setMobileMenuToggle] = useState(false)

    const navigate = useNavigate()

    const handleNavDrawer = (e) => {
        e.preventDefault()
        setDrawer(!drawer)
        setMobileMenuToggle(!mobileMenuToggle)
    };
    const handleOpenUserMenu = (e) => {
        e.preventDefault()
        setAnchorElUser(e.currentTarget);
    };

    const handleLogout = (e) => {
        logout();
        handleCloseUserMenu(e)
        navigate('/')
    }

    const handleCloseUserMenu = (e) => {
        setAnchorElUser(null);
    };

    const userFullName = user && user.firstName && user.firstName.concat(" ").concat(user.lastName)
    const avatar = profile && profile.avatar && profile.avatar.ContentType && profile.avatar.Data !== null ?
        (`data:${profile.avatar.ContentType};base64, ${Buffer.from(profile.avatar.Data.data).toString('base64')}`)
        : '';

    return (
        <>
            <AppBar
                position="fixed"
            >
                <Container maxWidth="md">
                    <Toolbar disableGutters>
                        {/* APP LOGO and NAME */}
                        <StyledLink to="/" style={{display:'flex'}}>
                            <Typography
                                variant="h2"
                                noWrap
                                component="div"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: "Rancho"
                                }}
                            >
                                ReadShelf
                            </Typography>
                        </StyledLink>

                        {/* HAMBURGER MENU BUTTON*/}
                        <Box onClick={handleNavDrawer} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center'}}>
                            {isAuthenticated &&
                                <button
                                    type="button"
                                    className={`hamburger ${mobileMenuToggle ? 'open' : 'menu'}`}
                                    id="menu-btn"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={()=> setDrawer(!drawer)}
                                >
                                    <span className="hamburger-top"/>
                                    <span className="hamburger-middle"/>
                                    <span className="hamburger-bottom"/>
                                </button>
                            }
                        </Box>
                        <StyledLink
                            to="/"
                            style={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },fontFamily: "'Merriweather', serif" }}
                        >
                            <Typography
                                variant="h2"
                                sx={{ display: { xs: 'flex', md: 'none' },  fontFamily: "Rancho" }}
                            >
                                ReadShelf
                            </Typography>
                        </StyledLink>

                        {/* WEB MENU */}
                        {isAuthenticated ?
                            <Box sx={{ flexGrow: 10, display: { xs: 'none', md: 'flex' } }}>
                                <StyledLink
                                    to={"/bookshelf"}
                                    style={{
                                        padding: '9px 16px',
                                        marginTop: '16px',
                                        marginBottom: '16px'
                                    }}
                                >
                                    Bookshelf
                                </StyledLink>
                                <StyledLink
                                    to={"/wishlist"}
                                    style={{
                                        padding: '9px 16px',
                                        marginTop: '16px',
                                        marginBottom: '16px'
                                    }}
                                >
                                    Wishlist
                                </StyledLink>
                                <StyledLink
                                    to={"/reviews"}
                                    style={{
                                        padding: '9px 16px',
                                        marginTop: '16px',
                                        marginBottom: '16px'
                                    }}
                                >
                                    Reviews
                                </StyledLink>
                                <StyledLink
                                    to={"/search"}
                                    style={{
                                        padding: '9px 16px',
                                        marginTop: '16px',
                                        marginBottom: '16px'
                                    }}
                                >
                                    Search
                                </StyledLink>
                            </Box>
                            :
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
                        }

                        {/* SHOW PROFILE LOGO IF USER LOGGED IN, SHOW LOGIN IF NOT AUTHENTICATED */}
                        {isAuthenticated && Boolean(user) ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title={userFullName}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={userFullName} src={avatar}/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <StyledLink
                                            to="/profile"
                                        >
                                            <Typography textAlign="center">Profile</Typography>
                                        </StyledLink>

                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            :
                            <Box sx={{ flexGrow: 0 }}>
                                <StyledLink
                                    to="/login"
                                    style={{
                                        padding: '9px 16px',
                                        marginTop: '16px',
                                        marginBottom: '16px'
                                    }}
                                >
                                    <Typography textAlign="center">Login</Typography>
                                </StyledLink>
                            </Box>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                sx={{zIndex: 10, display: { xs: 'flex', md: 'none' }}}
                anchor='top'
                open={drawer}
                onClose={handleNavDrawer}
            >
                <Box
                    sx={{ bgcolor:"#003366", display: "flex", justifyContent:'center'}}
                    color="#fff"
                    role="presentation"
                    onClick={handleNavDrawer}
                    onKeyDown={handleNavDrawer}
                    pt={8}
                >
                    <List>
                        <ListItem button>
                            <StyledLink to="/bookshelf">
                                <div style={{display: 'flex'}}>
                                    <ListItemIcon>
                                        <BookIcon sx={{color: "#fff"}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Bookshelf" />
                                </div>
                            </StyledLink>
                        </ListItem>
                        <ListItem button>
                            <StyledLink to="/wishlist">
                                <div style={{display: 'flex'}}>
                                    <ListItemIcon>
                                        <FavoriteIcon sx={{color: "#fff"}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Wishlist" />
                                </div>
                            </StyledLink>
                        </ListItem>
                        <ListItem button>
                            <StyledLink to="/reviews">
                                <div style={{display: 'flex'}}>
                                    <ListItemIcon>
                                        <ReviewsIcon sx={{color: "#fff"}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Reviews" />
                                </div>
                            </StyledLink>
                        </ListItem>
                        <ListItem button>
                            <StyledLink to="/search">
                                <div style={{display: 'flex'}}>
                                    <ListItemIcon>
                                        <SearchIcon sx={{color: "#fff"}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Search" />
                                </div>
                            </StyledLink>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {logout})(Navbar);