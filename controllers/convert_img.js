const fs = require('fs')
const path = require('path')
exports.convert_img = (files) => {
    let img = []
    files.forEach((file) => {
        var obj = {
            data: fs.readFileSync(
                path.join(__dirname + '//..//uploads//' + file.filename)
            ),
            contentType: 'image/png',
        }
        img.push(obj)
    })
    return img
}