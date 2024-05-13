interface Genres {
    id: number;
    name: string;
}
interface Production_companies {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}
interface MovieDetails {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    backdrop_path?: string;
    image?: string;
    budget?: number;
    genres?: Genres[];
    production_companies: Production_companies[];
}
interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}
interface Popular {
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | undefined;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface VideoResponse {
    id: number;
    results: Video[];
}
interface PageResponse<TResult> {
    results: TResult[];
    page: number;
}
interface Configuration {
    images: {
        base_url: string;
    };
}
// PopularTVSeries
type Genre = Array<string>;
type OriginCountry = Array<number>;
interface PopularTVSeries {
    backdrop_path: string | undefined;
    first_air_date: string;
    genre_ids: Genre;
    id: number;
    name: string;
    origin_country: OriginCountry;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}
export type {
    Genres,
    Production_companies,
    MovieDetails,
    Video,
    VideoResponse,
    PageResponse,
    Configuration,
    Popular,
    PopularTVSeries,
};
