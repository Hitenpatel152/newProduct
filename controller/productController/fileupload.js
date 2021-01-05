const multer = require('multer');
const path = require('path');
module.exports = {
    userFileUpload : (req, res) => {
        var paths = '';
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                console.log(__dirname + '/images');
                cb(null, __dirname + '/images');
            },
            filename: function (req, file, cb) {
                console.log(file);
                paths = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
                console.log(paths);
                cb(null, paths);
            },
        });

        var upload = multer({ storage: storage }).single('filetoupload');
        upload(req, res, async function (err) {
            if (err) {
                console.log(err);
                var returndata = {
                    fileName: '',
                    status: 'false',
                    message: 'Problem with file upload',
                };
            } else {
                var returndata = {
                    fileName: paths,
                    status: 'true',
                    message: 'file upload successfully',
                };
            }
		
            res.set(200).json(returndata);
        });
    }
}