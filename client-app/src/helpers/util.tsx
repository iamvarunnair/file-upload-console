import { AxiosResponse, AxiosError } from 'axios';
export const resSuccessCheck = (
    res: AxiosResponse<any> | AxiosError<any>,
    typedRes: AxiosResponse<any>
) => res?.status === 200 && typedRes?.data && !typedRes?.data?.error;

export type TFetchBlobURL = {
    urlDownload: string | null;
    error: string | null;
};
export type TFetchCodeURL = {
    text: string | null;
    error: string | null;
};

export async function toDataURL(url: string): Promise<TFetchBlobURL> {
    try {
        const blob = await fetch(url)
            .then((res) => res.blob())
            .catch(() => {
                throw "Couldn't load file from URL.";
            });
        return {
            urlDownload: URL.createObjectURL(blob) || null,
            error: null,
        };
    } catch (error: any) {
        return {
            urlDownload: null,
            error: JSON.stringify(error) || null,
        };
    }
}

export async function getCodeFromFileURL(url: string): Promise<TFetchCodeURL> {
    try {
        const text = await fetch(url)
            .then((res) => res.text())
            .catch(() => {
                throw "Couldn't load file from URL.";
            });
        return {
            text: text || null,
            error: null,
        };
    } catch (error: any) {
        return {
            text: null,
            error: JSON.stringify(error) || null,
        };
    }
}

export const handleDownload = async (urlDownload: string, fileName: string) => {
    const elA: HTMLAnchorElement = document.createElement('a');
    elA.target = '_blank';
    const { error, urlDownload: url } = await toDataURL(urlDownload);
    if (!error) {
        elA.href = url || '';
        elA.download = fileName || 'download';
        elA.style.display = 'none';
        document.body.appendChild(elA);
        elA.click();
        document.body.removeChild(elA);
    }
};
