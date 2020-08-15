const express = require('express')
const path = require("path")
const mime = require('mime-types')

const fileSaver = require('../helpers/file-saver')

const router = express.Router(); 

const IMAGE_PATH = path.join(process.cwd(), "public")




router.post('/add', fileSaver.single('image'), async (req, res) =>{
 try{

    const {file} = req
    // const filepath = path.join(IMAGE_PATH, `${file.filename}.${mime.extension(file.mimetype)}`)
    console.log(req.file);
    console.log(file);

    // await fs.rename(file.path, filepath);

    res.send({message: "OK"})

 }catch (e) {
     console.log(e);
 }
})

module.exports = router

