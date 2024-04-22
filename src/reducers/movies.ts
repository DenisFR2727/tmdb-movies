import { client } from '../api/tmdb';
import createReducer from '../redux/utils';
import { ActionWidthPayload } from '../redux/utils';
import { AppThunk } from '../store';

export interface Movie {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    image?: string;
}
export interface IMovieState {
    top: Movie[];
    loading: boolean;
    search: Movie[];
}

const initialState: IMovieState = {
    top: [],
    loading: false,
    search: [],
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
        }));

        dispatch(moviesSearch(mappedResults));
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
});

export default moviesReducer;
