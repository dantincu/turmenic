const fs = require('fs');

const loadJsonFromFile = (filePath) => {
    const rawdata = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawdata);

    return jsonData;
}

module.exports.loadJsonFromFile = loadJsonFromFile;

const loadJsonInto = (filePath, obj) => {
    const jsonData = loadJsonFromFile(filePath);

    if (typeof(obj) == "object") {
        for (const [key, value] of Object.entries(jsonData)) {
            obj[key] = value;
        }
    }

    return jsonData;
}

module.exports.loadJsonInto = loadJsonInto;