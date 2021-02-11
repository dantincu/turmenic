export const compareStringsAsInts = (leftVal, rightVal) => {
    let retVal = 0;

    let leftNum = parseInt(leftVal);
    let rightNum = parseInt(rightVal);

    if (leftNum < rightNum) {
        retVal = -1;
    } else if (leftNum > rightNum) {
        retVal = 1;
    }

    return retVal;
}

export const strReplaceAll = (val, replExpr) => {
    let replVal = null;

    if (typeof(val) == "string") {
        replVal = val.replace(val, replExpr);

        while (replVal !== val) {
            val = replVal;
            replVal = val.replace(val, replExpr);
        }
    }

    return replVal;
}

export const strCount = (val, str) => {
    let replVal = 0;

    if (typeof(val) == "string") {
        while (val.length > 0) {
            let idx = val.indexOf(str);

            if (idx >= 0) {
                replVal++;
            }
            else {
                break;
            }

            val = val.substring(idx + 1);
        }
    }

    return replVal;
}

