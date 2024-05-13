import {
    Genres,
    Popular,
    PopularTVSeries,
    Production_companies,
    VideoResponse,
} from '../api/types';
interface Movie {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    image?: string;
    budget?: number;
    genres?: Genres[];
    backdrop_path?: string;
    production_companies: Production_companies[];
}
interface IMovieState {
    top: Movie[];
    loading: boolean;
    search: Movie[];
    details: Movie[];
    video: VideoResponse[];
    popular: Popular[];
    seriesTop: PopularTVSeries[];
}
export type { Movie, IMovieState };
