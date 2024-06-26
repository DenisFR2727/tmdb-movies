import configuration from '../configuration';
import axios, { AxiosRequestConfig } from 'axios';
import {
    MovieDetails,
    VideoResponse,
    PageResponse,
    Configuration,
    Popular,
    PopularTVSeries,
    VideoResponseSeries,
} from './types';

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

export const client = {
    async getConfiguration() {
        const response = get<Configuration>('/configuration');
        return response;
    },
    async getNowPlaying(page: number): Promise<MovieDetails[]> {
        const response = await get<PageResponse<MovieDetails>>(
            `/movie/now_playing?page=${page}`
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
        const response = await get<VideoResponse>(
            `/movie/${movieId}/videos?language=ru-RU`
        );
        return response;
    },
    async getPopular(): Promise<Popular[]> {
        const response = await get<PageResponse<Popular>>(`/movie/popular`);
        return response.results;
    },
    async getTVTopRated(): Promise<PopularTVSeries[]> {
        const response = await get<PageResponse<PopularTVSeries>>(
            `/tv/top_rated?language=en-US&page=1`
        );
        return response.results;
    },
    async getVideoSeries(movieId: number): Promise<VideoResponseSeries> {
        const response = await get<VideoResponseSeries>(
            `/tv/${movieId}/videos?language=en-RU`
        );
        return response;
    },
};
