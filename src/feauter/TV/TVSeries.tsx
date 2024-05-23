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
import usePagination from '../../hooks/pagination';
import PaginationRounded from '../pagination/Pagination';

interface SeriesProps {
    series: PopularTVSeries[];
    loadingTVSeries: boolean;
    loadingVideoSeries: boolean;
}

function TVSeries({
    series,
    loadingTVSeries,
    loadingVideoSeries,
}: SeriesProps) {
    const dispatch = useAppDispatch();
    const { page, itemsPerPage, handlePageChange } = usePagination();
    const loading = loadingTVSeries || loadingVideoSeries;
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
            {!loading ? (
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
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        marginTop: '20px',
                    }}
                >
                    {series
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((s) => (
                            <Grid key={s.id} item xs={12} sm={6} md={4} lg={3}>
                                <Box height="100%">
                                    <TVSeriesCards {...s} />
                                </Box>
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
                            count={Math.ceil(series.length / itemsPerPage)}
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
    series: state.movies.seriesTop,
    loadingTVSeries: state.movies.loadingTVSeries,
    loadingVideoSeries: state.movies.loadingVideoSeries,
});
const connector = connect(mapStateToProps);
export default connector(TVSeries);
