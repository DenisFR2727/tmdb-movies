import configuration from '../configuration';
import axios, { AxiosRequestConfig } from 'axios';

async function get<TBody>(relativeUrl: string, params?: any): Promise<TBody> {
    const options: AxiosRequestConfig = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${configuration.apiToken}`,
        },
        params,
    };
    try {
        const response = await axios.get(
            `${configuration.apiUrl}/3/${relativeUrl}`,
            options
        );

        const date: TBody = await response.data;
        return date;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error status: ${error.response?.status}`);
        }
        throw new Error(`Error get themoviedb`);
    }
}
export interface Genres {
    id: number;
    name: string;
}
export interface Production_companies {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}
export interface MovieDetails {
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
export interface Video {
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

export interface VideoResponse {
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
export const client = {
    async getConfiguration() {
        const response = get<Configuration>('/configuration');
        return response;
    },
    async getNowPlaying(): Promise<MovieDetails[]> {
        const response = await get<PageResponse<MovieDetails>>(
            '/movie/now_playing?page=1'
        );
        return response.results;
    },
    async getSearch(query: string): Promise<MovieDetails[]> {
        const response = await get<PageResponse<MovieDetails>>(
            '/search/movie',
            {
                include_adult: 'false',
                language: 'en-US',
                page: '1',
                query,
            }
        );
        return response.results;
    },
    async getDetails(movieId: number): Promise<MovieDetails> {
        const response = await get<MovieDetails>(`/movie/${movieId}`);
        return response;
    },
    async getVideo(movieId: number): Promise<VideoResponse> {
        const response = await get<VideoResponse>(`/movie/${movieId}/videos`);
        return response;
    },
};
