const path = require('path');
const FileType = require('file-type');
const md5file = require('./md5');
const { copyFile } = require('fs/promises');
const os = require('os');
const HOMEDIR = os.homedir();

const { program } = require('commander');
program.version('1.0.0');

program
    .option('-s, --save <path>', '存储: 文件名为 ${name}.${md5}.${ext}')
    .option('-a, --archive <path>', '归档存储: 文件名为 ${md5}.${ext}')
    .option('-u, --uuid <path>', '归档存储: 文件名为 ${uuid}.${ext}');

program.parse(process.argv);

const options = program.opts();
if (options.save) {
    save(options.save);
}

async function save(filepath) {
    const cwd = process.cwd();
    if (!path.isAbsolute(filepath)) {
        filepath = path.resolve(cwd, filepath);
    }
    console.log(filepath);
    let ext = '';
    const pathObject = path.parse(filepath);
    console.log(pathObject.ext);
    if (pathObject.ext.charAt(0) === '.') {
        ext = pathObject.ext.substr(1);
    }
    const type = await FileType.fromFile(filepath);
    console.log(type);
    const md5 = await md5file(filepath);

    await copyFile(filepath, `${HOMEDIR}/Library/Mobile\ Documents/com~apple~CloudDocs/icloud-cli/${pathObject.name}.${md5}.${ext}`);
}