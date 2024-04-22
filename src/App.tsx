import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';

import styles from './App.module.scss';
import {
    AppBar,
    CssBaseline,
    Link,
    ThemeProvider,
    Toolbar,
    Typography,
    createTheme,
} from '@mui/material';
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
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <LiveTvIcon sx={{ mr: 2 }} />
                    <Typography>The Movies DB</Typography>
                    <nav>
                        <HeaderLink to="/search">Search</HeaderLink>

                        <HeaderLink to="/about">About</HeaderLink>

                        <HeaderLink to="/movies">Movies</HeaderLink>
                    </nav>
                </Toolbar>
            </AppBar>
            <main className={styles.main}>
                <Outlet />
            </main>
        </ThemeProvider>
    );
}

export default App;
