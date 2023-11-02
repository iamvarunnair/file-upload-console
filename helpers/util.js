const path = require('path');
const fs = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
const constants = require('./../constants');
const Busboy = require('busboy');

const getExtFromFileName = (fileName) => {
    const splitFileName = fileName?.split('.');
    return splitFileName
        ?.slice(splitFileName?.length ? splitFileName?.length - 1 : 0)
        ?.join('');
};

const getFileNameWithoutExt = (fileName) => {
    const splitFileName = fileName?.split('.');
    return splitFileName?.slice(0, splitFileName.length - 1).join('.');
};

const convert = async (ext, inputPath, outputPath) => {
    try {
        // Read file
        const docxBuf = await fs.readFile(inputPath);

        // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
        let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

        // Here in done you have pdf file which you can save or transfer in another stream
        await fs.writeFile(outputPath, pdfBuf);
        return {
            success: true,
        };
    } catch (error) {
        throw error;
    }
};

const getListFiles = async () => {
    const basePath = path.join(global.appRoot, constants.PATH_FILES);
    const files = await fs.readdir(basePath, { withFileTypes: true });
    return (
        files
            ?.filter((item) => !item.isDirectory())
            ?.map((item) => item.name) || []
    );
};

const parseForm = async (req) => {
    return new Promise((resolve, reject) => {
        // const form = new Busboy({ headers: req.headers });
        const form = req.busboy;
        const files = []; // create an empty array to hold the processed files
        const buffers = {}; // create an empty object to contain the buffers
        form.on('file', (_, file, details, enc, mime) => {
            buffers[details?.filename] = []; // add a new key to the buffers object
            file.on('data', (data) => {
                buffers[details?.filename].push(data);
            });
            file.on('end', () => {
                files.push({
                    fileBuffer: Buffer.concat(buffers[details?.filename]),
                    fileType: details?.mimeType,
                    fileName: details?.filename,
                    fileEnc: details?.encoding,
                });
            });
        });
        form.on('error', (err) => {
            reject(err);
        });
        form.on('finish', () => {
            resolve(files);
        });
        req.pipe(form); // pipe the request to the form handler
    });
};

const writeAllFiles = async (targetDirectory, filesToWrite) => {
    const writeResults = [];
    for (const fileData of filesToWrite) {
        const filePath = path.join(targetDirectory, fileData.fileName);

        try {
            await fs.writeFile(filePath, fileData.fileBuffer);
            writeResults.push({
                fileName: fileData.fileName,
                success: true,
            });
        } catch (error) {
            writeResults.push({
                fileName: fileData.fileName,
                success: false,
                error: error.message,
            });
        }
    }
    return writeResults;
};

const errorCatchRespond = (res, error, others) => {
    res.status(503).json({
        success: false,
        error: JSON.stringify(error?.message || error),
        ...others
    });
};

module.exports = {
    getExtFromFileName,
    getFileNameWithoutExt,
    convert,
    getListFiles,
    parseForm,
    writeAllFiles,
    errorCatchRespond,
};
