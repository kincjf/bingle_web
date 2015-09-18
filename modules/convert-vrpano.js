/**
 * Created by KIMSEONHO on 2015-09-17.
 */
var exec = require('child_process').execSync;
var os = require('os');
var path = require('path');
var _ = require('underscore');

// HACK: to make our calls to exec() testable,
// support using a mock shell instead of a real shell
var shell = process.env.SHELL || 'sh';
var scriptFile = "krpanotools";
var okMsg = "echo $?";
var deleteNewline = '/\n/g';
var currentPath = exec('echo `pwd`').toString('utf-8').replace(deleteNewline, '');
var delimeter = ':';
var krpanoDirectory = currentPath + "/tools/krpano-1.18.5-linux64";

var platform = os.platform();

// support for Win32 outside Cygwin
if (platform === 'win32' && process.env.SHELL === undefined) {
    shell = process.env.COMSPEC || 'cmd.exe';
    scriptFile = "makepano_normal.bat";
    okMsg = "echo %ERRORLEVEL%";
    deleteNewline = '/\r\n/g';
    currentPath = exec('echo %cd%').toString('utf-8').replace(deleteNewline, '');
    delimeter = ';';
    krpanoDirectory = currentPath + "tools/krpano-1.18.5-win";
}

/**
 * convert spherical image to cubical image
 * @param imagePath
 * @returns code - 0(success), other(fail)
 */
module.exports = function(imagePath) {
    var args = [];

    // transform windows backslashes to forward slashes for use in cygwin on windows
    if (path.sep === '\\') {
        scriptFile = scriptFile.replace(/\\/g, '/');
    }
    args.push(scriptFile);

    if (platform == "linux") {
        args = ["makepano", "-config=templates/normal_custom.config"];
    }

    // TODO: consider building the command line using a shell with the -c argument to run a command and exit
    //cmd = scriptFile;

    args.push(imagePath);

    var msg = exec(shell, args, {
        env : _.extend(process.env, {
            timeout : 50000,  //ms
            encoding : 'utf-8',
            cwd : krpanoDirectory,
            PATH : process.env.PATH + delimeter + krpanoDirectory
        })
    }).toString('utf-8');

    var code = exec(okMsg).toString('utf-8').replace(deleteNewline, '');

    return code;
}