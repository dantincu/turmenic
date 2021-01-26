const getDefaultErrorMessage = (arg, typeName) => {
    let errorMessage = "A value of type " + typeName + " was expected, but instead received " + typeof(arg);
    return errorMessage;
}

export const throwIfNotTypeof = (arg, typeName, errorMessage) => {
    if (typeof(arg) !== typeName) {
        errorMessage = errorMessage || getDefaultErrorMessage(arg, typeName);
        throw new Error(errorMessage);
    }
}

export const buildInTypes = {
    undefined: "undefined",
    object: "object",
    boolean: "boolean",
    number: "number",
    bigint: "bigint",
    string: "string",
    symbol: "symbol",
    function: "function"
}
