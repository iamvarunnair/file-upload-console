import * as React from 'react';
import {
    TResFile,
    TResGetFiles,
    TResPostFilesUpload,
    getFiles,
    postFilesUpload,
} from './../services/files.service';
import { AxiosResponse, AxiosError } from 'axios';
import {
    getCodeFromFileURL,
    handleDownload,
    resSuccessCheck,
} from './../helpers/util';
import {
    FORMATS_SUPPORTED_AUDIO,
    FORMATS_SUPPORTED_CODE,
    FORMATS_SUPPORTED_DOCS,
    FORMATS_SUPPORTED_IMAGES,
    FORMATS_SUPPORTED_VIDEO,
} from './../constants/files.constants';

const CodePreview = ({ url }: { url: string }) => {
    const [codeText, setCodeText] = React.useState('');
    React.useEffect(() => {
        getCodeFromFileURL(url)
            .then(({ text }) => {
                setCodeText(text || '');
            })
            .catch();
    }, []);
    return <>{codeText}</>;
};

const PageUpload = () => {
    const setFormatsImages = new Set(FORMATS_SUPPORTED_IMAGES);
    const setFormatsDocs = new Set(FORMATS_SUPPORTED_DOCS);
    const setFormatsAudio = new Set(FORMATS_SUPPORTED_AUDIO);
    const setFormatsVideo = new Set(FORMATS_SUPPORTED_VIDEO);
    const setFormatsCode = new Set(FORMATS_SUPPORTED_CODE);
    const [filesUpload, setFilesUpload] = React.useState<FileList | null>(null);
    const [files, setFiles] = React.useState<TResFile[]>([]);
    const fetchFiles = async () => {
        const response: AxiosResponse<TResGetFiles> | AxiosError<TResGetFiles> =
            await getFiles();
        const successResponse = response as AxiosResponse<TResGetFiles>;
        if (resSuccessCheck(response, successResponse)) {
            setFiles(successResponse?.data?.files || []);
        }
    };
    React.useEffect(() => {
        fetchFiles();
    }, []);
    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilesUpload(event?.target?.files);
    };
    const upload = async (): Promise<void> => {
        const formData = new FormData();
        if (filesUpload && filesUpload?.length) {
            for (let i = 0, l = filesUpload?.length || 0; i < l; i++) {
                formData.append('' + i, filesUpload[i]);
            }
        }

        const response:
            | AxiosResponse<TResPostFilesUpload>
            | AxiosError<TResPostFilesUpload> = await postFilesUpload(formData);
        const successResponse = response as AxiosResponse<TResPostFilesUpload>;
        if (resSuccessCheck(response, successResponse)) {
        }
    };
    return (
        <>
            <h1 className='text-3xl font-kodchasan font-bold'>Upload</h1>
            <input type='file' multiple onChange={onFileChange} />
            {filesUpload?.length
                ? Array.from(filesUpload)
                      ?.map((el) => el?.name)
                      ?.join(', ')
                : null}
            <button type='button' onClick={upload}>
                Upload
            </button>
            <br /><br /><br />
            {files?.map((el: TResFile) => (
                <div className=''>
                    {setFormatsImages.has(el?.ext) ? (
                        <img
                            width='200'
                            height='400'
                            style={{ objectFit: 'contain' }}
                            src={el?.preview}
                        />
                    ) : setFormatsDocs.has(el?.ext) ? (
                        <embed
                            width='200'
                            height='400'
                            style={{ objectFit: 'contain' }}
                            src={el?.preview}
                        />
                    ) : setFormatsAudio.has(el?.ext) ? (
                        <div style={{ width: '200', height: '400' }}>
                            <audio
                                style={{ width: '200', height: '400' }}
                                controls={true}
                            >
                                <source src={el?.preview} type='audio/mp4' />
                            </audio>
                        </div>
                    ) : setFormatsVideo.has(el?.ext) ? (
                        <div style={{ width: '200', height: '400' }}>
                            <video width='200' height='400' controls>
                                <source src={el?.preview} />
                                Your browser does not support HTML5 video.
                            </video>
                        </div>
                    ) : setFormatsCode.has(el?.ext) ? (
                        <pre style={{ width: '200', height: '400' }}>
                            <CodePreview url={el?.preview} />
                        </pre>
                    ) : (
                        <div style={{ width: '200', height: '400' }}>
                            No Preview
                        </div>
                    )}
                    <button
                        type='button'
                        onClick={() => handleDownload(el?.download, el?.file)}
                    >
                        Download
                    </button>
                </div>
            ))}
        </>
    );
};

export default PageUpload;
