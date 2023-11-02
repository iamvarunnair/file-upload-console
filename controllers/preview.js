const path = require('path');
const fs = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
const constants = require('./../constants');
const { errorCatchRespond } = require('../helpers/util');

async function convert(req, res, pathFile, pathFileWithoutExtension) {
    try {
        if (!global?.appRoot) {
            throw 'Error unexpected: global variable appRoot missing.';
        }

        // supported types: xlsx, xls, doc, docx
        const ext = '.pdf';
        const basePath = path.join(global.appRoot, constants.PATH_FILES);
        const inputPath = path.join(basePath, pathFile);
        const outputPath = path.join(
            basePath,
            `${pathFileWithoutExtension}${ext}`
        );

        // Read file
        const docxBuf = await fs.readFile(inputPath);

        // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
        let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

        // Here in done you have pdf file which you can save or transfer in another stream
        await fs.writeFile(outputPath, pdfBuf);

        const urlPreview =
            req.protocol +
            '://' +
            req.get('host') +
            constants.PATH_FILES +
            '/' +
            pathFileWithoutExtension +
            ext;

        res.status(200).json({
            success: true,
            url: urlPreview,
        });
    } catch (error) {
        throw error;
    }
}

const formatsSupported = ['xlsx', 'xls', 'doc', 'docx'];

const get = (req, res) => {
    try {
        if (!req?.params?.fileName) {
            res.status(400).json({
                error: 'Bad request: request param fileName missing.',
            });
            return;
        }

        const splitNameArray = req.params.fileName.split('.');
        if (splitNameArray?.length < 2) {
            res.status(400).json({
                error: 'Bad request: request param fileName is missing extension.',
            });
            return;
        }

        const extension = splitNameArray[splitNameArray?.length - 1];
        if (!formatsSupported.some((el) => el === extension)) {
            res.status(400).json({
                error: `Bad request: fileName extension ${extension} is not supported.`,
            });
            return;
        }

        const fileWithoutExtension = splitNameArray
            .slice(0, splitNameArray.length - 1)
            .join('');

        const basePath = path.join(global.appRoot, constants.PATH_FILES);

        fs.readdir(basePath)
            .then((files) => {
                if (
                    files.some((file) => file === fileWithoutExtension + '.pdf')
                ) {
                    const urlPreview =
                        req.protocol +
                        '://' +
                        req.get('host') +
                        constants.PATH_FILES +
                        '/' +
                        fileWithoutExtension +
                        '.pdf';

                    res.status(200).json({
                        success: true,
                        url: urlPreview,
                    });
                } else {
                    convert(req, res, req.params.fileName, fileWithoutExtension)
                        .then(() =>
                            res.status(200).json({
                                success: true,
                            })
                        )
                        .catch((error) => {
                            res.status(503).json({
                                error: JSON.stringify(
                                    error ? error : 'Error unexpected:'
                                ),
                            });
                        });
                }
            })
            .catch((err) => errorCatchRespond(res, err));
    } catch (errorBoundary) {
        errorCatchRespond(res, errorBoundary);
    }
};

module.exports = {
    get,
};
