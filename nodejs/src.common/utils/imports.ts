export const resolveRelPath = (...relPathParts: string[]) => {
  relPathParts = relPathParts.map((pathPart) => pathPart.trim());
  relPathParts = relPathParts.filter((pathPart) => !!pathPart);

  const relPath = relPathParts.join("/");
  return relPath;
};
