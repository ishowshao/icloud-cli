const { program } = require('commander');
program.version('1.0.0');

program
    .option('-s, --save', '存储: 文件名为 ${name}.${md5}.${ext}')
    .option('-a, --archive', '归档存储: 文件名为 ${md5}.${ext}')
    .option('-u, --uuid', '归档存储: 文件名为 ${uuid}.${ext}');

program.parse(process.argv);