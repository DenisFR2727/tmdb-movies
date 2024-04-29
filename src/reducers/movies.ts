import { client } from '../api/tmdb';

// Types
import { Movie, IMovieState } from './types';
import { VideoResponse, MovieDetails, Popular } from '../api/types';

import createReducer from '../redux/utils';
import { ActionWidthPayload } from '../redux/utils';
import { AppThunk } from '../store';

const initialState: IMovieState = {
    top: [],
    loading: false,
    search: [],
    datails: [],
    video: [],
    popular: [],
};
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
// Brought the function for optimization to the region.
const mappedResultsFunc = (
    results: MovieDetails[],
    imageUrl: string
): Movie[] => {
    return results.map((m) => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        popularity: m.popularity,
        image: m.backdrop_path
            ? `${imageUrl}w780${m.backdrop_path}`
            : undefined,
        budget: m.budget,
        genres: m.genres,
        production_companies: m.production_companies,
    }));
};
export function fetchMovies(page: number): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        dispatch(moviesLoading());
        // Get
        const config = await client.getConfiguration();
        const imageUrl = config.images.base_url;
        const results = await client.getNowPlaying(page);

        const mappedResults: Movie[] = mappedResultsFunc(results, imageUrl);

        dispatch(moviesLoaded(mappedResults));
    };
}
// Search
export function fetchSearchMovies(query: string): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        dispatch(moviesLoading());
        const config = await client.getConfiguration();
        const imageUrl = config.images.base_url;
        const results = await client.getSearch(query);

        const mappedResults: Movie[] = mappedResultsFunc(results, imageUrl);

        dispatch(moviesSearch(mappedResults));
    };
}
export function fetchDatailsMovies(movieId: number): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        dispatch(moviesLoading());
        const config = await client.getConfiguration();
        const imageUrl = config.images.base_url;
        const m = await client.getDetails(movieId);

        const mappedResults: MovieDetails = {
            id: m.id,
            title: m.title,
            overview: m.overview,
            popularity: m.popularity,
            image: m.backdrop_path
                ? `${imageUrl}w780${m.backdrop_path}`
                : undefined,
            budget: m.budget,
            genres: m.genres,
            production_companies: m.production_companies,
        };

        dispatch(moviesDetails([mappedResults]));
    };
}
export function fetchVideoMovies(videoId: number): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        dispatch(moviesLoading());

        const video = await client.getVideo(videoId);
        const movieId = video.id;

        const mappedResults: VideoResponse = {
            id: video.id,
            results: video.results.map((m) => ({
                idVideo: movieId,
                iso_639_1: m.iso_639_1,
                iso_3166_1: m.iso_3166_1,
                name: m.name,
                key: m.key,
                site: m.site,
                size: m.size,
                type: m.type,
                official: m.official,
                published_at: m.published_at,
                id: m.id,
            })),
        };

        dispatch(moviesVideo([mappedResults]));
    };
}
export function fetchPopularMovie(): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        try {
            dispatch(moviesLoading());
            const config = await client.getConfiguration();
            const imageUrl = config.images.base_url;
            const popular = await client.getPopular();

            const mappedResults: Popular[] = popular.map((m) => ({
                id: m.id,
                original_language: m.original_language,
                original_title: m.original_title,
                overview: m.overview,
                popularity: m.popularity,
                poster_path: m.poster_path
                    ? `${imageUrl}w300${m.poster_path}`
                    : undefined,
                release_date: m.release_date,
                title: m.release_date,
                video: m.video,
                vote_average: m.vote_average,
                vote_count: m.vote_count,
            }));
            dispatch(moviesPopular(mappedResults));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoadingFalse()); // Dispatch an action to set loading to false
        }
    };
}
const moviesReducer = createReducer<IMovieState>(initialState, {
    'movies/loaded': (state, action: ActionWidthPayload<Movie[]>) => {
        return {
            ...state,
            top: action.payload,
            loading: false,
        };
    },
    'movies/loading': (state, action) => {
        return {
            ...state,
            loading: true,
        };
    },
    'movies/search': (state, action) => {
        return {
            ...state,
            search: action.payload,
            loading: true,
        };
    },
    'movies/details': (state, action) => {
        return {
            ...state,
            datails: action.payload,
            loading: true,
        };
    },
    'movies/video': (state, action) => {
        return {
            ...state,
            video: action.payload,
            loading: true,
        };
    },
    'movies/popular': (state, action) => {
        return {
            ...state,
            popular: action.payload,
            loading: false,
        };
    },
    'movies/loadingFalse': (state) => {
        state.loading = false;
        return state;
    },
});

export default moviesReducer;
