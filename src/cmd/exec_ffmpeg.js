const {
    exec
} = require('child_process');
const fs = require("fs");
const path = require('path');
const child_process = require('child_process');
const hasbin = require('hasbin');
const params = process.argv.slice(2);
const param_command = params[0]
const param_folder = params[1]

const commands = ['generatePalette', 'generateGif', 'generateMp4', 'generateAll']

hasbin('ffmpeg', (result) => {
    if (!result)
        throw new Error(`please install ffmpeg binaries`)
})

if (!param_folder)
    throw new Error(`please specify an sketch name`)

if (!param_command)
    throw new Error(`please specify an command from ${commands}`)


var sketch_folder = path.join(__dirname, '..', param_folder);

if (!sketch_folder) {
    throw new Error(`sketch folder '${relativePath}' doens't exist`)
} else {
    //console.log(`sketch_folder=>`, sketch_folder)
    let webmfiles = fs.readdirSync(sketch_folder).filter(fileName => fileName.slice(-5) === '.webm')
    if (!webmfiles.length)
        throw new Error(`generate .webm videos for sketch ${path} first`)
    for (let index = 0; index < webmfiles.length; index++) {
        const filename = webmfiles[index];
        const pathName = path.join(sketch_folder, filename)
        execCmd(pathName)
    }
}

function execCmd(file) {
    switch (param_command) {
        case commands[0]:
            generatePalette(file)
            break;
        case commands[1]:
            generatePalette(file)
            generateGif(file)
            break;
        case commands[2]:
            generateMp4(file);
            break;
        case commands[3]:
            generatePalette(file)
            generateGif(file)
            generateMp4(file);
            break;

    }
}

function generatePalette(file) {
    console.log(file)
    spawnProcess('ffmpeg', ['-y', '-i', file, '-vf', 'palettegen', `${file}.png`])
}

function generateGif(file) {
    spawnProcess('ffmpeg', ['-y', '-i', file, '-i', `${file}.png`, '-filter_complex', 'paletteuse', '-r', '10', `${file}.gif`])
}

function generateMp4(file) {
    spawnProcess('ffmpeg', ['-i', file, '-crf', '0', '-r', 60, `${file}.mp4`])
}

function spawnProcess(process, args) {
    var child = child_process.spawnSync(process, args, {
        encoding: 'utf8'
    });
    console.log("Process finished.");
    if (child.error) {
        console.log("ERROR: ", child.error);
    }
    console.log("stdout: ", child.stdout);
    console.log("stderr: ", child.stderr);
    console.log("exist code: ", child.status);
}