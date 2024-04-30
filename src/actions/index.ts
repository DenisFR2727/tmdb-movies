import { Popular, VideoResponse } from '../api/types';
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
export {
    moviesLoaded,
    moviesLoading,
    moviesSearch,
    moviesDetails,
    moviesVideo,
    moviesPopular,
    setLoadingFalse,
};
