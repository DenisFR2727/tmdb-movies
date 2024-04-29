import * as React from 'react';
import { HeaderLink } from '../../App';
import { useSelector } from 'react-redux';
import { fetchSearchMovies } from '../../reducers/movies';
import { useAppDispatch } from '../../hooks/hooks';
import { SearchIconWrapper, Search, StyledInputBase } from './StyleSearch';
import FoundMovies from './FoundMoviesCards';

// MUI
import { CardMedia, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';

// Types
import { IMovieState } from '../../reducers/types';

import { Button } from 'react-bootstrap';
import './search.scss';

export function SearchAppBar() {
    const [query, setQuery] = React.useState<string>('');
    const dispatch = useAppDispatch();
    const searchResults = useSelector(
        (state: { movies: IMovieState }) => state.movies.search
    );
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearchClick = async () => {
        dispatch(fetchSearchMovies(query));
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
            }}
        >
            <AppBar position="absolute">
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={query}
                            onChange={handleInputChange}
                        />
                        <Button
                            variant="outlined"
                            onClick={handleSearchClick}
                            style={{ color: 'white' }}
                        >
                            Search
                        </Button>
                    </Search>
                    <Typography sx={{ paddingLeft: '50px' }}>
                        <HeaderLink to="/">Home</HeaderLink>
                    </Typography>
                </Toolbar>
            </AppBar>
            {searchResults.length === 0 ? (
                <Typography
                    id="not-found-movies"
                    sx={{
                        paddingTop: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        color: 'black',
                    }}
                >
                    Movies not Found!
                </Typography>
            ) : (
                searchResults.map((movie: any) => (
                    <FoundMovies key={movie.id} {...movie} />
                ))
            )}
        </Box>
    );
}
export function SearchMovie() {
    return <SearchAppBar />;
}
