const multer = require('multer');
const path = require('path');

const fileSaver = multer({
    destination: path.join(process.cwd(), 'tmp'),
})


module.exports = fileSaver;