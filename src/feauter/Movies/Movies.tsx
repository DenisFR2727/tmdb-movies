import { useEffect } from 'react';
import { Movie, fetchMovies } from '../../reducers/movies';
import { useAppDispatch } from '../../hooks/hooks';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import MovieCard from './MoviesCard';

import { Container } from '@mui/system';
import { Grid, LinearProgress, Typography } from '@mui/material';

export interface MoviesProps {
    movies: Movie[];
    loading: boolean;
}

function Movies({ movies, loading }: MoviesProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
        <Container sx={{ py: 8, paddingTop: '0px' }} maxWidth="lg">
            <Typography
                sx={{ marginTop: '10px' }}
                variant="h4"
                align="center"
                gutterBottom
            >
                Movies
            </Typography>
            {loading ? (
                <LinearProgress color="secondary" />
            ) : (
                <Grid container spacing={4}>
                    {movies.map((movie) => (
                        <Grid item key={movie.id} xs={12} sm={6} md={4}>
                            <MovieCard {...movie} />
                        </Grid>
                    ))}
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
