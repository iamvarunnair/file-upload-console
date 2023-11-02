const constants = require('./../constants');
const {
    getExtFromFileName,
    getFileNameWithoutExt,
    getListFiles,
    errorCatchRespond,
} = require('../helpers/util');

/* get - get file names with preview available, eg duplicate .pdf ext of excel ext .xlsx files is fetched, and not .xlsx files */
const get = (req, res) => {
    try {
        getListFiles()
            .then((files) => {
                const mappedFiles = files.map((file) => {
                    const extFromFileName = getExtFromFileName(file);
                    const preview =
                        constants.CONVERT_SUPPORTED_LIBRE_OFFICE.some(
                            (ext) => ext === extFromFileName
                        )
                            ? req.protocol +
                              '://' +
                              req.get('host') +
                              constants.PATH_FILES_PREVIEW +
                              '/' +
                              getFileNameWithoutExt(file) +
                              extFromFileName +
                              '.pdf'
                            : req.protocol +
                              '://' +
                              req.get('host') +
                              constants.PATH_FILES +
                              '/' +
                              file;
                    const download =
                        req.protocol +
                        '://' +
                        req.get('host') +
                        constants.PATH_FILES +
                        '/' +
                        file;
                    return {
                        file,
                        preview,
                        ext: extFromFileName,
                        download,
                    };
                });
                res.status(200).json({
                    success: true,
                    files: mappedFiles,
                });
            })
            .catch((err) => errorCatchRespond(res, err));
    } catch (errorBoundary) {
        errorCatchRespond(res, errorBoundary);
    }
};

module.exports = {
    get,
    getListFiles,
};
