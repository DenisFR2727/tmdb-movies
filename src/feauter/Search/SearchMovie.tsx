import * as React from 'react';
import { HeaderLink } from '../../App';
import { useSelector } from 'react-redux';
import { fetchSearchMovies } from '../../reducers/movies';
import { useAppDispatch } from '../../hooks/hooks';
import { SearchIconWrapper, Search, StyledInputBase } from './StyleSearch';

// MUI
import { CardMedia, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';

// Types
import { IMovieState } from '../../reducers/types';

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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="absolute" sx={{ display: 'flex' }}>
                <Toolbar>
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
                        <button onClick={handleSearchClick}>Search</button>
                    </Search>
                    <Typography sx={{ paddingLeft: '50px' }}>
                        <HeaderLink to="/">Home</HeaderLink>
                    </Typography>
                </Toolbar>
            </AppBar>
            {searchResults.length === 0 ? (
                <Typography
                    className="not-found-movies"
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
                    <div key={movie.id}>
                        <CardMedia
                            component={'div'}
                            image={movie.image}
                            sx={{ pt: '56.25%' }}
                        />
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                ))
            )}
        </Box>
    );
}
export function SearchMovie() {
    return <SearchAppBar />;
}
