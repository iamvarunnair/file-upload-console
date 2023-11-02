import * as React from 'react';
import { TResFile, TResGetFiles, getFiles } from '../services/files.service';
import { resSuccessCheck } from '../helpers/util';
import { AxiosResponse, AxiosError } from 'axios';
import ItemListFiles from './ItemListFiles';

const ListFiles = () => {
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
    return (
        <>
            <div className='w-100'>
                {files?.map((el: TResFile) => (
                    <ItemListFiles {...el} />
                ))}
            </div>
        </>
    );
};

export default ListFiles;
