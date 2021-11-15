const fs = require('fs');
const crypto = require('crypto');

module.exports = (filename) => {
    return new Promise((resolve) => {
        const hash = crypto.createHash('md5');
        const input = fs.createReadStream(filename);
        input.on('readable', () => {
            const data = input.read();
            if (data)
                hash.update(data);
            else {
                resolve(hash.digest('hex'));
            }
        });
    });
};