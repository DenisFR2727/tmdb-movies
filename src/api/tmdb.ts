import configuration from '../configuration';
import axios from 'axios';

async function get<TBody>(relativeUrl: string): Promise<TBody> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${configuration.apiToken}`,
        },
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
// Search
async function getSearchMovie<TBody>(query: string): Promise<TBody> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${configuration.apiToken}`,
        },
        params: {
            include_adult: 'false',
            language: 'en-US',
            page: '1',
            query: query,
        },
    };
    // /3/search/movie?include_adult=false&language=en-US&page=1
    try {
        const response = await axios.get(
            `${configuration.apiSearch}/3/search/movie`,
            options
        );

        const date: TBody = await response.data;
        return date;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error status: ${error.response?.status}`);
            console.error(error.message);
        }
        throw new Error(`Error get themoviedb`);
    }
}
export interface MovieDatails {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    backdrop_path?: string;
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
    async getNowPlaying(): Promise<MovieDatails[]> {
        const response = await get<PageResponse<MovieDatails>>(
            '/movie/now_playing?page=1'
        );
        return response.results;
    },
    async getConfigurationSearch() {
        const response = getSearchMovie<Configuration>('/configuration');
        return response;
    },
    async getSearch(query: string): Promise<MovieDatails[]> {
        const response = await getSearchMovie<PageResponse<MovieDatails>>(
            query
        );
        return response.results;
    },
};
