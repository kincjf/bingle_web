/**
 * Created by KIMSEONHO on 2015-09-18.
 */
var express = require('express');
var router = express.Router();

var convertVR = require('../modules/convert-vrpano.js');
var makeFolder = require('../modules/make-resource-folder.js');

/* board upload action. */
router.post('/:account/:timestamp', function(req, res, next) {
    var resourcePath = "./resources";

    makeFolder(req.params.account, req.params.timestamp);

    // 폴더 내 파일 저장

    var imagePath = resourcePath + "/" + req.params.account + "/" + req.params.timestamp
        + "/" + "20150914155834.jpg";      // for test

    var resultCode = convertVR(imagePath);

    res.json(resultCode);
});
module.exports = router;