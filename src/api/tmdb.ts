// import configuration from '../configuration';
import axios, { AxiosRequestConfig } from 'axios';
import {
    MovieDetails,
    VideoResponse,
    PageResponse,
    Configuration,
    Popular,
} from './types';

async function get<TBody>(relativeUrl: string, params?: any): Promise<TBody> {
    const options: AxiosRequestConfig = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
        params,
    };
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/3/${relativeUrl}`,
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
};
