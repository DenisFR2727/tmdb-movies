import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchPopularTVSeries } from '../../reducers/movies';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { PopularTVSeries } from '../../api/types';
import TVSeriesCards from './TVSeriesCards';
import {
    Box,
    Grid,
    LinearProgress,
    Typography,
    Container,
} from '@mui/material';

interface SeriesProps {
    series: PopularTVSeries[];
    loading: boolean;
}

function TVSeries({ series, loading }: SeriesProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPopularTVSeries());
    }, [dispatch]);

    return (
        <Container>
            <Typography
                sx={{ marginTop: '10px' }}
                variant="h4"
                align="center"
                gutterBottom
            >
                <p id="movies-top">Series</p>
            </Typography>
            {loading ? (
                <LinearProgress
                    sx={{
                        marginTopTop: '100px',
                        background: 'red',
                        width: '60%',
                        margin: '0 auto',
                    }}
                    color="secondary"
                />
            ) : (
                <Grid
                    container
                    spacing={2}
                    sx={{
                        display: 'flex',
                        alignItems: 'stretch',
                        marginTop: '20px',
                    }}
                >
                    {series.map((s) => (
                        <Grid key={s.id} item xs={12} sm={6} md={4} lg={3}>
                            <Box height="100%">
                                <TVSeriesCards {...s} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
const mapStateToProps = (state: RootState) => ({
    series: state.movies.seriesTop,
    loading: state.movies.loading,
});
const connector = connect(mapStateToProps);
export default connector(TVSeries);
