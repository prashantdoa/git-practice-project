const multer = require("multer")

const storage = multer.diskStorage({
    destination:function (req, file, callback) {
        return callback(null, "public/uploads")
    },
    filename:function(req, file, callback) {
        return callback(null, Date.now() + file.originalname)
    },
})

module.exports = {storage};