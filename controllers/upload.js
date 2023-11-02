const constants = require('./../constants');
const fs = require('fs');
const path = require('path');
const {
    getFileNameWithoutExt,
    getExtFromFileName,
    convert,
    parseForm,
    writeAllFiles,
    errorCatchRespond,
} = require('../helpers/util');

const formatsSupported = ['xlsx', 'xls', 'doc', 'docx'];
const setFormatsSupported = new Set(formatsSupported);

const post = async (req, res) => {
    try {
        const files = await parseForm(req);
        const writeResults = await writeAllFiles(
            global.appRoot + constants.PATH_FILES + '/',
            files
        );
        // Convert excel or doc files to pdf for preview
        for (const file of writeResults) {
            const extension = getExtFromFileName(file?.fileName);
            if (setFormatsSupported.has(extension)) {
                // supported types: xlsx, xls, doc, docx
                const extConverted = '.pdf';
                const fileNameWithoutExt = getFileNameWithoutExt(
                    file?.fileName
                );
                const inputPath = path.join(
                    global.appRoot,
                    constants.PATH_FILES,
                    file?.fileName
                );
                const outputPath = path.join(
                    global.appRoot,
                    constants.PATH_FILES_PREVIEW,
                    `${fileNameWithoutExt}${extension}${extConverted}`
                );
                try {
                    await convert(extConverted, inputPath, outputPath);
                } catch {} // do nothing
            }
        }
        if (writeResults?.some((el) => el?.success)) {
            res.status(200).json({
                success: true,
                errorFiles: writeResults?.filter((el) => !el?.success) || [],
            });
        } else {
            throw new Error("Couldn't upload the files.");
        }
    } catch (errorBoundary) {
        errorCatchRespond(res, errorBoundary);
    }
};

// const post = (req, res) => {
//     try {
//         let streamFile;
//         req.pipe(req.busboy);
//         req.busboy.on('file', (_, file, filename) => {
//             // log server
//             console.log('Log: uploading: ' + filename.filename);

//             if (!global?.appRoot) {
//                 throw 'Error unexpected: global variable appRoot missing.';
//             }

//             //Path where image will be uploaded
//             streamFile = fs.createWriteStream(
//                 global.appRoot + constants.PATH_FILES + '/' + filename.filename
//             );
//             file.pipe(streamFile);
//             streamFile.on('close', async function () {
//                 const extension = getExtFromFileName(filename.filename);
//                 if (formatsSupported.some((el) => el === extension)) {
//                     // supported types: xlsx, xls, doc, docx
//                     const extConverted = '.pdf';
//                     const fileNameWithoutExt = getFileNameWithoutExt(
//                         filename.filename
//                     );
//                     const inputPath = path.join(
//                         global.appRoot,
//                         constants.PATH_FILES,
//                         filename.filename
//                     );
//                     const outputPath = path.join(
//                         global.appRoot,
//                         constants.PATH_FILES_PREVIEW,
//                         `${fileNameWithoutExt}${extension}${extConverted}`
//                     );
//                     try {
//                         await convert(extConverted, inputPath, outputPath);
//                     } catch {} // do nothing
//                     res.status(200).json({
//                         success: true,
//                     });
//                 } else {
//                     res.status(200).json({
//                         success: true,
//                     });
//                 }
//             });
//         });
//     } catch (errorBoundary) {
//         errorCatchRespond(res, errorBoundary);
//     }
// };

module.exports = {
    post,
};
