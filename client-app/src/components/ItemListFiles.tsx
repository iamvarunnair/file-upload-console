import * as React from 'react';
import {
    FORMATS_SUPPORTED_AUDIO,
    FORMATS_SUPPORTED_CODE,
    FORMATS_SUPPORTED_DOCS,
    FORMATS_SUPPORTED_IMAGES,
    FORMATS_SUPPORTED_VIDEO,
} from '../constants/files.constants';
import { getCodeFromFileURL } from '../helpers/util';

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

type TPropsItemListFiles = {
    file: string;
    preview: string;
    download: string;
    fileClass?: string;
    ext: string;
};

const ItemListFiles = (props: TPropsItemListFiles) => {
    const {
        file = '',
        preview = '',
        download = '',
        fileClass = 'w-16 h-20',
        ext = '',
    } = props;

    const setFormatsImages = new Set(FORMATS_SUPPORTED_IMAGES);
    const setFormatsDocs = new Set(FORMATS_SUPPORTED_DOCS);
    const setFormatsAudio = new Set(FORMATS_SUPPORTED_AUDIO);
    const setFormatsVideo = new Set(FORMATS_SUPPORTED_VIDEO);
    const setFormatsCode = new Set(FORMATS_SUPPORTED_CODE);
    const elPreview = setFormatsImages.has(ext) ? (
        <img
            width='200'
            height='400'
            className={fileClass}
            style={{ objectFit: 'contain' }}
            src={preview}
        />
    ) : setFormatsDocs.has(ext) ? (
        <embed
            width='200'
            height='400'
            className={fileClass}
            style={{ objectFit: 'contain' }}
            src={preview}
        />
    ) : setFormatsAudio.has(ext) ? (
        <div style={{ width: '200', height: '400' }} className={fileClass}>
            <audio
                style={{ width: '200', height: '400' }}
                className={fileClass}
                controls={true}
            >
                <source src={preview} type='audio/mp4' />
            </audio>
        </div>
    ) : setFormatsVideo.has(ext) ? (
        <div style={{ width: '200', height: '400' }} className={fileClass}>
            <video width='200' height='400' className={fileClass} controls>
                <source src={preview} />
                Your browser does not support HTML5 video.
            </video>
        </div>
    ) : setFormatsCode.has(ext) ? (
        <pre style={{ width: '200', height: '400' }} className={fileClass}>
            <CodePreview url={preview} />
        </pre>
    ) : (
        <div style={{ width: '200', height: '400' }} className={fileClass}>
            No Preview
        </div>
    );
    return <>{elPreview}</>;
};

export default ItemListFiles;
