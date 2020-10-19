const express = require('express');
const multer = require('multer');
const logger = require('morgan');
const path = require('path');
const { promises: fsPromises } = require('fs');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const app = express();

app.use(logger('dev'));

const storage = multer.diskStorage({
    destination: 'draft',
    filename: function (req, file, cb) {
        // console.log('PATH', path.parse(file.originalname));
        const ext = path.parse(file.originalname).ext;
      cb(null, file.fieldname + '-' + Date.now() + ext);
    }
  })

const upload = multer({ storage });

app.use(express.static('static'));

app.post('/form-data', upload.single('file_example'), minifyImage, (req, res) => {
    try {
        console.log('req.file', req.file);
        console.log('req.body', req.body);

        return res.send(req.body);
    } catch(err) {
        console.log(err);
    }
});

/**
 * {
    fieldname: 'file_example',
    originalname: 'pexels-photo-1402787.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'draft',
    filename: '4a8032f38b90fc1640521e0ee6959cdd',
    path: 'draft/4a8032f38b90fc1640521e0ee6959cdd',
    size: 567002
}
 */

app.listen(3000, () => {
    console.log('Server was started');
});

async function minifyImage(req, res, next) {
    try {
        console.log('Start processing file...');

        const MINIFIED_DIR = 'static';

        await imagemin([req.file.path], {
            destination: MINIFIED_DIR,
            plugins: [
                imageminJpegtran(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });

        const { filename, path: draftPath } = req.file;

        console.log('draftPath', draftPath);

        await fsPromises.unlink(draftPath);

        req.file = {
            ...req.file,
            path: path.join(MINIFIED_DIR, filename),
            destination: MINIFIED_DIR
        }

        console.log('Finished processing file...');
    } catch(err) {
        console.log(err);
    }

    next();
}
