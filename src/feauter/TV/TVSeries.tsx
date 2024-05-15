import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchPopularTVSeries } from '../../reducers/movies';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { PopularTVSeries } from '../../api/types';
import TVSeriesCards from './TVSeriesCards';
import { Box, Grid, LinearProgress, Card, Typography } from '@mui/material';
// import { Card } from 'flowbite-react';

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
        <Box>
            <p
                id="movies-top"
                style={{
                    display: 'flex',
                    paddingBottom: '80px',
                    justifyContent: 'center',
                }}
            >
                Series
            </p>
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
        </Box>
    );
}
const mapStateToProps = (state: RootState) => ({
    series: state.movies.seriesTop,
    loading: state.movies.loading,
});
const connector = connect(mapStateToProps);
export default connector(TVSeries);
