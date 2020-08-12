const testData = require('../modules/handel');
const express = require("express")
const router = express.Router()
const fs = require("fs")
const multer = require("multer")
const upload = multer({
    dest: 'uploads/'
})
const connsql = require("../dbsql/db")
const path = require("path")
const os = require("os")


router.get('/', (req, res) => {
    res.render('file.html')
})


router.post('/picture', upload.single('imges'), (req, res) => {
    var imges = req.file
        // 使用Promise处理异步函数，也不知道是不是真的
    function readPic(imgesPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(imgesPath, (err, data) => {
                if (err) {
                    console.log("图片上传失败")
                    return reject(err)
                }
                resolve(data) // 这里的data时写文件执行的data
            })
        })
    }

    function writePic(data, pic) {
        return new Promise((resolve, reject) => {

            fs.writeFile(path.join(__dirname, '../public/image/' + pic), data, (err) => {
                if (err) {
                    console.log("图片写入失败！")
                    res.send({
                        code: -1,
                        msg: "图片上传失败！"
                    })
                    return reject(err)
                }
                resolve(pic)
            })
        })
    }

    function insertPic(pic) {
        return new Promise((resolve, reject) => {
            const couter = os.networkInterfaces() //获取主机地址
            for (var cm in couter) {
                var cms = couter[cm]
            }
            var picPath = "http://" + cms[1].address + ':3002' + '/public/image/' + pic
            var insertPic = "insert into pic_table(pic_router) values('" + picPath + "')"
            connsql.query(insertPic, (err, result) => {
                if (err) {
                    console.log("保存到数据库失败！")
                    reject(err)
                }
                resolve(picPath)

                res.send({
                    code: 200,
                    msg: "图片上传成功",
                    urls: picPath
                })
            })
        })
    }

    var imgesori = imges.originalname // 图片名称
    var radname = Date.now() + parseInt(Math.random() * 999) // 随机生成时间戳
    var oriname = imgesori.lastIndexOf('.')
    var hzm = imgesori.substring(oriname, oriname.length) // 图片后缀名
    var pic = radname + hzm // 图片名称拼接图片后缀名

    readPic(imges.path)
        .then((data, err) => {
            if (err) {
                return console.log(err);
            }
            return writePic(data, pic)
        })
        .then((data, err) => {
            if (err) {
                return console.log(err);
            }
            return insertPic(pic)
        })
        .catch((err) => {
            console.log(err)
        })
})




router.get('/queryAll', function(req, res, next) {
    testData.queryAll(req, res, next);
});




module.exports = router