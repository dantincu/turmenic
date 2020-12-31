import hljs from "highlight.js";

export const htmlEscapedPairs: {
  main: {
    value: string;
    escaped: string;
  };
  map: {
    [key: string]: string;
  };
  list: Array<string>;
} = {
  main: {
    value: "&",
    escaped: "&amp;",
  },
  map: {
    "'": "&apos;",
    '"': "&quot;",
    "<": "&lt;",
    ">": "&gt;",
    " ": "&nbsp;",
  },
  list: ["<", ">"],
};

export const escapeForHtml = (value: string) => {
  // let retVal = value.replaceAll(
  let retVal = value
    .split(htmlEscapedPairs.main.value)
    .join(htmlEscapedPairs.main.escaped);

  htmlEscapedPairs.list.forEach((val: string) => {
    retVal = retVal.split(val).join(htmlEscapedPairs.map[val]);
  });

  return retVal;
};

export const loadFromFile = (filePath: string) => {
  let retVal = fetch(filePath).then((r) => r.text());

  return retVal;
};

export const highlightDocsCodeBlocks = () => {
  let codeBlocks = document.querySelectorAll(".tncvd-docs-container pre code");
  for (let i = 0; i < codeBlocks.length; i++) {
    let block = codeBlocks[i];
    highlightCodeBlock(block as HTMLElement);
  }
};

export const highlightCodeBlock = (block: HTMLElement) => {
  hljs.highlightBlock(block);
};
