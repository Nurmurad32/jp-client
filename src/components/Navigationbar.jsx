import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


const Navigationbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const logout = async (navigate) => {
        try {
            await axios.post('/logout');
            toast.success('Logged out successfully');
            navigate('/login'); // Redirect to login page or any other page
        } catch (error) {
            console.error(error);
            toast.error('Logout failed');
        }
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem >
                                <Link to="/"><Typography textAlign="center">Home</Typography></Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link to="/cerate"><Typography textAlign="center">Create a Job</Typography></Link>
                            </MenuItem>

                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MenuItem >
                            <Link to="/"><Typography textAlign="center">Home</Typography></Link>
                        </MenuItem>
                        <MenuItem >
                            <Link to="/create"><Typography textAlign="center">Create a Job</Typography></Link>
                        </MenuItem>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            onClick={handleLogout}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Typography textAlign="center">Logout</Typography>
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navigationbar;