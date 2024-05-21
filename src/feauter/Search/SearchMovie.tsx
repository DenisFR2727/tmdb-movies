import * as React from 'react';
import { useEffect } from 'react';
import { HeaderLink } from '../../App';
import { useSelector } from 'react-redux';
import { fetchSearchMovies } from '../../reducers/movies';
import { useAppDispatch } from '../../hooks/hooks';
import { SearchIconWrapper, Search, StyledInputBase } from './StyleSearch';
import FoundMovies from './FoundMoviesCards';

// MUI
import { Grid, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';

// Types
import { IMovieState } from '../../reducers/types';

import { Button } from 'react-bootstrap';
import './search.scss';
import usePagination from '../../hooks/pagination';
import PaginationRounded from '../pagination/Pagination';
import Modal from '../Modal/Modal';

export function SearchAppBar() {
    const dispatch = useAppDispatch();
    const { page, itemsPerPage, handlePageChange } = usePagination();
    const searchResults = useSelector(
        (state: { movies: IMovieState }) => state.movies.search
    );
    const [query, setQuery] = React.useState<string>('');
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setQuery(event.target.value);
    };

    const handleSearchClick = async () => {
        dispatch(fetchSearchMovies(query));
        setQuery('');
    };
    // Modal
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            sx={{
                flexGrow: 1,
                position: 'relative',
            }}
        >
            <AppBar position="fixed">
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
                            sx={{
                                outline: 'none',
                                '&:focus': {
                                    outline: 'none',
                                },
                            }}
                            id="border"
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
                    }}
                >
                    Movies not Found!
                </Typography>
            ) : (
                searchResults
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((movie: any) => (
                        <FoundMovies key={movie.id} {...movie} />
                    ))
            )}
            {searchResults.length > 0 && (
                <Grid
                    item
                    xs={12}
                    sx={{
                        paddingTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        paddingBottom: '20px',
                    }}
                >
                    <PaginationRounded
                        count={Math.ceil(searchResults.length / itemsPerPage)}
                        page={page}
                        handlePageChange={handlePageChange}
                    />
                </Grid>
            )}
            {isModalOpen && (
                <Modal>
                    <p>Please find a movie in search!</p>
                    <button className="btn-modal-search">
                        <div className="btn-close"></div>
                    </button>
                </Modal>
            )}
        </Box>
    );
}
export function SearchMovie() {
    return <SearchAppBar />;
}
