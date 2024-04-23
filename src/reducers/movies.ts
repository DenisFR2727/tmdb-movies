import {
    Genres,
    MovieDetails,
    Production_companies,
    Video,
    VideoResponse,
    client,
} from '../api/tmdb';
import createReducer from '../redux/utils';
import { ActionWidthPayload } from '../redux/utils';
import { AppThunk } from '../store';

export interface Movie {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    image?: string;
    budget?: number;
    genres?: Genres[];
    production_companies: Production_companies[];
}
export interface IMovieState {
    top: Movie[];
    loading: boolean;
    search: Movie[];
    datails: Movie[];
    video: VideoResponse[];
}
// export interface VideoWithMovieId extends Video {
//     movieId: number;
// }

const initialState: IMovieState = {
    top: [],
    loading: false,
    search: [],
    datails: [],
    video: [],
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
export function fetchMovies(): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        dispatch(moviesLoading());
        // Get
        const config = await client.getConfiguration();
        const imageUrl = config.images.base_url;
        const results = await client.getNowPlaying();

        const mappedResults: Movie[] = results.map((m) => ({
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

        const mappedResults: Movie[] = results.map((m) => ({
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
});

export default moviesReducer;
