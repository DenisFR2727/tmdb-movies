import {
    Popular,
    PopularTVSeries,
    VideoResponse,
    VideoResponseSeries,
} from '../api/types';
import { Movie } from '../reducers/types';

// actionCreators
const moviesLoaded = (movies: Movie[]) => ({
    type: 'movies/loaded',
    payload: movies,
});
const moviesLoading = () => ({
    type: 'movies/loading',
});
const moviesSearch = (movies: Movie[]) => ({
    type: 'movies/search',
    payload: movies,
});
const moviesDetails = (movies: Movie[]) => ({
    type: 'movies/details',
    payload: movies,
});
const moviesVideo = (movies: VideoResponse[]) => ({
    type: 'movies/video',
    payload: movies,
});
const moviesPopular = (movies: Popular[]) => ({
    type: 'movies/popular',
    payload: movies,
});
const setLoadingFalse = () => {
    return {
        type: 'movies/loadingFalse',
    };
};
// Series
const serialsPopular = (series: PopularTVSeries[]) => {
    return {
        type: 'movies/TVpopular',
        payload: series,
    };
};
const serialsPopularVideo = (series: VideoResponseSeries[]) => {
    return {
        type: 'movies/videoSeries',
        payload: series,
    };
};
const tvSeriesLoading = () => {
    return {
        type: 'movies/tvSeriesLoading',
    };
};
const videoSeriesLoading = () => {
    return {
        type: 'movies/videoSeriesLoading',
    };
};
export {
    moviesLoaded,
    moviesLoading,
    moviesSearch,
    moviesDetails,
    moviesVideo,
    moviesPopular,
    setLoadingFalse,
    serialsPopular,
    serialsPopularVideo,
    tvSeriesLoading,
    videoSeriesLoading,
};
