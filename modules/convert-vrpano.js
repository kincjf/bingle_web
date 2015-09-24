/**
 * Created by KIMSEONHO on 2015-09-17.
 * 지금은 처리하기가 귀찮아서 동기로 했음
 * 하지만 사용자가 변환때문에 짜증날 수 있기 때문에
 * 비동기로 바꾸고 변환 결과를 알려주어야 할 것 같다.
 */
var childProcess = require('child_process');
var exec = childProcess.execSync;
var spawn = childProcess.spawnSync;

var os = require('os');
var path = require('path');
var _ = require('underscore');

var log = require('console-log-level')({
    prefix: function () { return new Date().toISOString() },
    level: 'info'
})

var platform = os.platform();

var shell, scriptFile, okMsg, deleteNewline, currentPath, delimeter, krpanoDirectory;

if (platform === 'linux') {
// HACK: to make our calls to exec() testable,
// support using a mock shell instead of a real shell
    shell = process.env.SHELL || 'sh';
    scriptFile = "krpanotools";
    okMsg = "echo $?";
    deleteNewline = '/\n/g';
    currentPath = exec('echo `pwd`').toString('utf-8').replace(/\n/g, '');
    delimeter = ':';
    krpanoDirectory = currentPath + "/tools/krpano-1.18.5-linux64";
}
else if (platform === 'win32' && process.env.SHELL === undefined) {
    // support for Win32 outside Cygwin
    shell = process.env.COMSPEC || 'cmd.exe';
    scriptFile = "makepano_normal.bat";
    okMsg = "echo %ERRORLEVEL%";
    deleteNewline = '/\r\n/g';
    currentPath = exec('echo %cd%').toString('utf-8').replace(/\r\n/g, '');
    delimeter = ';';
    krpanoDirectory = currentPath + "\\tools\\krpano-1.18.5-win";
}

_.extend(process.env, { PATH : process.env.PATH + delimeter + krpanoDirectory });

/**
 * Convert spherical image to cubical image
 * Before execute, must to filtering file which is type of spherical image
 * @param imagePath
 * @returns code - 0(success), other(fail)
 */
module.exports = function(imagePath) {
    var args = [];

    if (platform == "linux") {
        args = ["makepano", "-config=templates/normal_custom.config"];
    }

    // TODO: consider building the command line using a shell with the -c argument to run a command and exit
    //cmd = scriptFile;

    args.push(imagePath);

    // image 파일이 존재하는지에 대한 검증은 하지 못함
    // 이미지 파일이 존재하지 않아도 echo(stdout)로 출력됨, stderr = ""
    var msg = spawn(scriptFile, args, {
        timeout : 50000,  //ms
        encoding : 'utf-8',
        //cwd : krpanoDirectory,        // process 관점에서 바라보는 실행 경로 지정 가능
        env : process.env       // process 관점에서 바라보는 환경 변수
    });

    var code = msg.status;

    if (msg.error) {
        log.error("convert-vrpano - " + msg.error.message);
        code = 1;
    } else {
        if (msg.stderr == "") {
            code = exec(okMsg).toString('utf-8').replace(/\r\n/g, '');
        } else {
            code = 1;
            log.error("convert-vrpano - " + msg.stderr);
        }
    }

    return code;
}