import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchPopularTVSeries } from '../../reducers/movies';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { PopularTVSeries } from '../../api/types';
import TVSeriesCards from './TVSeriesCards';
import { Box, Grid } from '@mui/material';

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
        <Grid
            container
            spacing={2}
            sx={{ display: 'flex', alignItems: 'stretch' }}
        >
            {series.map((s) => (
                <Grid key={s.id} item xs={12} sm={6} md={4} lg={3}>
                    <Box height="100%">
                        <TVSeriesCards {...s} />
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}
const mapStateToProps = (state: RootState) => ({
    series: state.movies.seriesTop,
    loading: state.movies.loading,
});
const connector = connect(mapStateToProps);
export default connector(TVSeries);
