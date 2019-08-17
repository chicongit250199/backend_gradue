import express from 'express';
import { log } from 'winston';
import appConf from '../config/application';
import { isAuthenticated } from '../service/permission';
import * as uploadService from '../service/file-upload.service';
import { HttpError, HTTP_ERROR } from '../config/error';

const userFileRouter = express.Router();

const multer = require('multer');

const DIR = './uploads/';
const uploadHandler = multer({
    dest: DIR
}).single('file');

userFileRouter.post('/', isAuthenticated, (req, res) => {
    uploadHandler(req, res, (err) => {
        if (err) {
            return res.status(422)
                .send('an Error occured');
        }
        const {
            filename,
            size,
            mimetype,
            originalname,
            description
        } = req.file;
        const fileId = uploadService.create({
            userId: req.user.id,
            filename,
            originalname,
            filesize: size,
            filetype: mimetype,
            userDocumentType: req.body.documentType,
            description: description || ''
        });
        return res.status(200)
            .send(fileId);
    });
});

userFileRouter.get('/:id(\\d+)', isAuthenticated, async (req, res, next) => {
    try {
        const fs = require('fs');
        const file = await uploadService.get(req.params.id);
        const filePath = `${appConf.fileUploadDir}/${file.file_name}`;
        if (!fs.existsSync(`${appConf.fileUploadDir}`)) {
            fs.mkdirSync(`${appConf.fileUploadDir}`);
        }
        if (fs.existsSync(filePath)) {
            res.setHeader('Content-disposition', `attachment; filename=${file.original_name}`);
            res.setHeader('Content-type', file.filetype);
            const fileStream = fs.createReadStream(filePath);
            return fileStream.pipe(res);
        }
        return next(new HttpError(HTTP_ERROR.NOT_FOUND, 'Not found file'));
    } catch (e) {
        log.info(JSON.stringify(e));
        return next(e);
    }
});

export { userFileRouter };
