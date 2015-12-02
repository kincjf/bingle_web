/**
 * Created by KIMSEONHO on 2015-12-02.
 */
var vrpano = require('./../modules/convert-vrpano');
var imagePath = './test/resources/20150914155834.jpg';
var status = vrpano(imagePath);

console.log("status : " + status);