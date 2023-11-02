import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';

const baseUrl: string = 'http://localhost:3000/';

export type TResPostFilesUpload = {
    success: boolean;
    error?: string;
    errorFiles?: {
        filename: string;
        success: boolean;
        error?: string;
    }[];
};
export type TResFile = {
    file: string;
    preview: string;
    ext: string;
    download: string;
};

export type TResGetFiles = {
    success: boolean;
    error?: string;
    files?: TResFile[];
};

export const postFilesUpload = (
    formData: FormData
): Promise<
    AxiosResponse<TResPostFilesUpload> | AxiosError<TResPostFilesUpload>
> => {
    return axios.post(baseUrl + 'api/files/upload', formData);
};

export const getFiles = (): Promise<
    AxiosResponse<TResGetFiles> | AxiosError<TResGetFiles>
> => {
    return axios.get(baseUrl + 'api/files');
};
