import React, { useState } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';

import styles from './App.module.scss';
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemText,
    ThemeProvider,
    Toolbar,
    Typography,
    createTheme,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { teal } from '@mui/material/colors';

export function HeaderLink({
    children,
    to,
}: {
    to: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            component={RouterLink}
            to={to}
            variant="button"
            color="inherit"
            sx={{ mr: 1, mx: 1.5 }}
        >
            {children}
        </Link>
    );
}
const defaultTheme = createTheme({
    palette: {
        primary: teal,
        secondary: {
            main: '#96000f',
        },
    },
});
function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery(defaultTheme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
        <div>
            <List
                sx={{
                    background: `url('/image/movie-background-collage.jpg')`,
                    height: '100vh',
                    width: '100px',
                }}
            >
                {['Search', 'About', 'Movies'].map((text, index) => (
                    <ListItem
                        key={text}
                        component={RouterLink}
                        to={`/${text.toLowerCase()}`}
                    >
                        <ListItemText
                            primary={text}
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '0',
                                    height: '1px',
                                    bottom: 0,
                                    left: '50%',
                                    backgroundColor: 'white',
                                    transition: 'all 0.3s ease-in-out',
                                },
                                '&:hover::before': {
                                    width: '100%',
                                    left: '0',
                                },
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar>
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <LiveTvIcon sx={{ mr: 2 }} />
                    <Typography>The Movies DB</Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{
                                    mr: 2,
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="left"
                                open={drawerOpen}
                                onClose={handleDrawerToggle}
                            >
                                {drawer}
                            </Drawer>
                        </>
                    ) : (
                        <nav>
                            <HeaderLink to="/search">Search</HeaderLink>
                            <HeaderLink to="/about">About</HeaderLink>
                            <HeaderLink to="/movies">Movies</HeaderLink>
                        </nav>
                    )}
                </Toolbar>
            </AppBar>
            <Box
                className={styles.generalBackground}
                sx={{ paddingTop: '70px' }}
            >
                <Outlet />
            </Box>
        </ThemeProvider>
    );
}

export default App;
