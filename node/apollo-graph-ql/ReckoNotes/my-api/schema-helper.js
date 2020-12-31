const fs = require('fs')
const _ = require('lodash');

const getSchemaStringFromFile = (fp) => {
        let data = fs.readFileSync(fp, 'utf8');
        let indexOf = data.indexOf("`");
        let lastIndexOf = data.lastIndexOf("`");
        let subStringLength = lastIndexOf - indexOf - 1;
        data = data.substr(indexOf + 1, subStringLength);
        data = _.replace(data, "\\`", "`");
        return data;
    
};

const concatSchemaFromFiles = (fpArr) => {
    try {
        let schemaStr = '';
        for (let fp in fpArr) {
            schemaStr += getSchemaStringFromFile(fpArr[fp]);
        }
        console.log("Successfully concatenated schema from files");
        return schemaStr;
    } catch (err) {
        console.log(err);
    }
}

module.exports.getSchemaStringFromFile = getSchemaStringFromFile;
module.exports.concatSchemaFromFiles = concatSchemaFromFiles;

// console.log(concatSchemaFromFiles(['./schema/services-schema.js']));