import { client } from '../api/tmdb';
import produce from 'immer';

// Types
import { Movie, IMovieState } from './types';
import {
    VideoResponse,
    MovieDetails,
    Popular,
    PopularTVSeries,
} from '../api/types';

import createReducer from '../redux/utils';
import { ActionWidthPayload } from '../redux/utils';
import { AppThunk } from '../store';
import { Dispatch } from 'redux';
import {
    moviesDetails,
    moviesLoaded,
    moviesLoading,
    moviesPopular,
    moviesSearch,
    moviesVideo,
    serialsPopular,
    setLoadingFalse,
} from '../actions';

const initialState: IMovieState = {
    top: [],
    loading: false,
    search: [],
    details: [],
    video: [],
    popular: [],
    seriesTop: [],
};

// optimization function mapped
function mappedResultMovies(results: Movie[], imageUrl: string) {
    return results.map((m) => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        popularity: m.popularity,
        image: m.backdrop_path
            ? `${imageUrl}w780${m.backdrop_path}`
            : undefined,
        budget: m.budget,
        production_companies: m.production_companies,
    }));
}
// Optimization imageUrl
async function fetchConfigAndReturnImageUrl(
    dispatch: Dispatch
): Promise<string> {
    dispatch(moviesLoading());
    const config = await client.getConfiguration();
    const imageUrl = config.images.base_url;
    return imageUrl;
}
export function fetchMovies(page: number): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        const imageUrl = await fetchConfigAndReturnImageUrl(dispatch);
        const results = await client.getNowPlaying(page);

        const mappedResults: Movie[] = mappedResultMovies(results, imageUrl);
        dispatch(moviesLoaded(mappedResults));
    };
}
// Search
export function fetchSearchMovies(query: string): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        const imageUrl = await fetchConfigAndReturnImageUrl(dispatch);
        const results = await client.getSearch(query);

        const mappedResults: Movie[] = mappedResultMovies(results, imageUrl);
        dispatch(moviesSearch(mappedResults));
    };
}
// Deteils
export function fetchDetailsMovies(movieId: number): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        const imageUrl = await fetchConfigAndReturnImageUrl(dispatch);
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
            const imageUrl = await fetchConfigAndReturnImageUrl(dispatch);
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
export function fetchPopularTVSeries(): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        const imageUrl = await fetchConfigAndReturnImageUrl(dispatch);
        const m = await client.getTVTopRated();

        const mappedResults: PopularTVSeries[] = m.map((m) => ({
            backdrop_path: m.poster_path
                ? `${imageUrl}w300${m.backdrop_path}`
                : undefined,
            first_air_date: m.first_air_date,
            genre_ids: m.genre_ids,
            id: m.id,
            name: m.name,
            origin_country: m.origin_country,
            original_language: m.original_language,
            original_name: m.original_name,
            overview: m.overview,
            popularity: m.popularity,
            poster_path: m.poster_path
                ? `${imageUrl}w300${m.poster_path}`
                : undefined,
            vote_average: m.vote_average,
            vote_count: m.vote_count,
        }));
        dispatch(serialsPopular(mappedResults));
    };
}
const moviesReducer = createReducer<IMovieState>(initialState, {
    'movies/loaded': produce((state, action: ActionWidthPayload<Movie[]>) => {
        state.top = action.payload;
        state.loading = false;
    }),
    'movies/loading': produce((state, action) => {
        state.loading = true;
    }),
    'movies/search': produce((state, action: ActionWidthPayload<Movie[]>) => {
        state.search = action.payload;
        state.loading = true;
    }),
    'movies/details': produce(
        (state, action: ActionWidthPayload<MovieDetails[]>) => {
            state.details = action.payload;
            state.loading = true;
        }
    ),
    'movies/video': produce(
        (state, action: ActionWidthPayload<VideoResponse[]>) => {
            state.video = action.payload;
            state.loading = true;
        }
    ),
    'movies/popular': produce(
        (state, action: ActionWidthPayload<Popular[]>) => {
            state.popular = action.payload;
            state.loading = false;
        }
    ),
    'movies/loadingFalse': produce((state) => {
        state.loading = false;
        return state;
    }),
    'movies/TVpopular': produce(
        (state, action: ActionWidthPayload<PopularTVSeries[]>) => {
            state.seriesTop = action.payload;
            state.loading = false;
        }
    ),
});

export default moviesReducer;
