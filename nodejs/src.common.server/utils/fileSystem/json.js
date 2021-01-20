import fs from 'fs';

export const loadJsonFromFile = (filePath) => {
    const rawdata = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawdata);

    return jsonData;
};

export const loadJsonInto = (filePath, obj) => {
    const jsonData = loadJsonFromFile(filePath);

    if (typeof(obj) == "object") {
        for (const [key, value] of Object.entries(jsonData)) {
            obj[key] = value;
        }
    }

    return jsonData;
};
