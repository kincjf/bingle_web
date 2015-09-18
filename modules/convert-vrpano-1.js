/**
 * Created by KIMSEONHO on 2015-09-17.
 */
var exec = require('child_process').execSync;
var os = require('os');

var folderWin = "./tools/krpano-1.18.5-win";
var folderLinux = "./tools/krpano-1.18.5-linux64";

var krpanoWin = "makepano_normal.bat";
var krpanoLinux = "krpanotools";

var winOkMsg = "echo %ERRORLEVEL%";
var linuxOkMsg = "echo $?";

/**
 * convert spherical image to cubical image
 * @param imagePath
 * @returns code - 0(success), other(fail)
 */
module.exports = function(imagePath) {
    var cmd, folder;
    var args = [];
    var okMsg;

    if (os.platform() == "win32") {
        folder = folderWin;
        cmd = krpanoWin;
        okMsg = winOkMsg;
    } else {    // linux
        folder = folderLinux;
        cmd = krpanoLinux;
        args = ["makepano", "-config=templates/normal_custom.config"];
        okMsg = linuxOkMsg;
    }

    args.push(imagePath);

    // var cd = exec("echo %cd%").toString('utf-8');     // for test

    var test = exec(cmd, args, {
        timeout : 50000,  //ms
        encoding : 'utf-8',
        cwd : folder
    });

    var code = exec(okMsg);

    return code;
}