import { CardMedia, Typography } from '@mui/material';
import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { SearchIconWrapper, Search, StyledInputBase } from './StyleSearch';
import SearchIcon from '@mui/icons-material/Search';
import { HeaderLink } from '../../App';
import { useSelector } from 'react-redux';

import { IMovieState, fetchSearchMovies } from '../../reducers/movies';
import { useAppDispatch } from '../../hooks/hooks';

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
                    sx={{
                        paddingTop: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        color: 'black',
                    }}
                >
                    Films not Found!
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
