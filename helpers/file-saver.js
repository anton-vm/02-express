const multer = require('multer');
const path = require('path');

const fileSaver = multer({
    dest: path.join(process.cwd(), 'tmp'),
})


module.exports = fileSaver;