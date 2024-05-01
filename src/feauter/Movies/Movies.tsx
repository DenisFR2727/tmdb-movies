import { useEffect, useState } from 'react';
import { Movie } from '../../reducers/types';
import { fetchMovies } from '../../reducers/movies';

import { useAppDispatch } from '../../hooks/hooks';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import MovieCard from './MoviesCard';
import PaginationRounded from '../pagination/Pagination';

// Mui
import { Container } from '@mui/system';
import { Grid, LinearProgress, Typography } from '@mui/material';
import './movies.scss';

export interface MoviesProps {
    movies: Movie[];
    loading: boolean;
}

function Movies({ movies, loading }: MoviesProps) {
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 6;

    useEffect(() => {
        dispatch(fetchMovies(page));
    }, [dispatch, page]);

    const handlePageChange = (_: any, value: number) => {
        setPage(value);
    };
    return (
        <Container sx={{ py: 8, paddingTop: '0px' }} maxWidth="lg">
            <Typography
                sx={{ marginTop: '10px' }}
                variant="h4"
                align="center"
                gutterBottom
            >
                <p id="movies-top">Movies</p>
            </Typography>
            {loading ? (
                <LinearProgress color="secondary" />
            ) : (
                <Grid container spacing={4}>
                    {movies
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((movie) => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4}>
                                <MovieCard {...movie} />
                            </Grid>
                        ))}
                    <Grid
                        item
                        xs={12}
                        sx={{
                            paddingTop: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <PaginationRounded
                            count={Math.ceil(movies.length / itemsPerPage)}
                            page={page}
                            handlePageChange={handlePageChange}
                        />
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}
const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top,
    loading: state.movies.loading,
});
const connector = connect(mapStateToProps);

export default connector(Movies);
