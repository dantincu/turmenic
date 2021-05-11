export const addFileNameSuffix = (
  fileName: string,
  suffix: string,
  separator: string
) => {
  const parts = fileName.split(".");

  if (parts.length > 1) {
    const idx = parts.length - 2;

    parts[idx] = [parts[idx], suffix].join(separator);
    fileName = parts.join(".");
  } else {
    fileName = [parts[0], suffix].join(separator);
  }

  return fileName;
};
