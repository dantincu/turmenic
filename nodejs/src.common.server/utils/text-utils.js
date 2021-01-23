export const compareVersions = (vrsLeft, vrsRight) => {
    let retVal = 0;

    let vrsLeftParts = vrsLeft.trim().split('.');
    let vrsRightParts = vrsRight.trim().split('.');

    let vrsPartsCount = Math.min(vrsLeftParts.length, vrsRightParts.length);
    
    for (let i = 0; i < vrsPartsCount.length; i++) {
        retVal = compareStringsAsInts(vrsLeftParts[i], vrsRightParts[i]);
        if (retVal !== 0) {
            break;
        }
    }

    return retVal;
}

export const compareStringsAsInts = (leftVal, rightVal) => {
    let retVal = 0;

    let leftNum = parseInt(leftVal);
    let rightNum = parseInt(rightVal);

    if (leftNum < rightNum) {
        retVal = 1;
    } else if (leftNum > rightNum) {
        retVal = -1;
    }

    return retVal;
}