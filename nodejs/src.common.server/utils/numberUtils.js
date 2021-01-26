export const compareNumbers = (leftNum, rightNum) => {
    let retVal = 0;

    if (leftNum < rightNum) {
        retval = -1;
    } else if (leftNum > rightNum) {
        retVal = 1;
    }

    return retVal;
}