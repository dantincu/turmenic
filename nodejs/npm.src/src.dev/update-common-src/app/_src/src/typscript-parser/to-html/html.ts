import { writeFileAsync } from "../../../src.node.common/fileSystem/index.js";
import { encodeHtml } from "../../../src.node.common/text/html-pre.js";
import { generateConstantStr } from "../../../src.common/utils/arrays.js";

export interface HtmlPageData {
  filePath: string;
  pageTitle: string;
  pageDescription: string;
  authorName: string;
  htmlPageCss: string;
  htmlContent: {
    header: string;
    main: string;
    footer: string;
  };
}

export class HtmlPageCreator {
  constructor() {}

  public async createHtmlPage(data: HtmlPageData) {
    const htmlCode = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>${data.pageTitle}</title>
    <meta name="description" content="${data.pageDescription}">
    <meta name="author" content="${data.authorName}">
    <style>
${data.htmlPageCss}
    </style>
</head>
<body>
    <header>
${data.htmlContent.header}
    </header>
    <main>
        <pre class="ts-code">
${data.htmlContent.main}
        </pre>
    </main>
    <footer>
${data.htmlContent.footer}
    </footer>
</body>
</html>
        `;

    await writeFileAsync(data.filePath, htmlCode);
  }
}

export interface HtmlNodeProps {
  parentElement?: HtmlElementProps | null | undefined;
}

export abstract class HtmlNode<TProps extends HtmlNodeProps> {
  props: TProps;
  constructor(props: TProps) {
    this.props = props;
  }

  public abstract toString(): string;
}

export interface HtmlTextNodeProps extends HtmlNodeProps {
  text: string;
}

export class HtmlTextNode extends HtmlNode<HtmlTextNodeProps> {
  public toString(): string {
    const retVal = encodeHtml(this.props.text);
    return retVal;
  }
}

export interface HtmlLineBreakProps extends HtmlNodeProps {}

export class HtmlLineBreak extends HtmlNode<HtmlNodeProps> {
  toString() {
    return "<br>";
  }
}

export interface HtmlElementProps extends HtmlNodeProps {
  tagName: string;
  className?: string | null | undefined;
  children: HtmlNodeProps[];
}

export class HtmlElement extends HtmlNode<HtmlElementProps> {
  public toString(): string {
    const props = this.props;
    const childrenHtml = props.children
      .map((nodeProps) => this.getHtmlNode(nodeProps).toString())
      .join("");

    const classAttr =
      typeof props.className === "string" ? ` class="${props.className}"` : "";

    const retVal = `<${props.tagName}${classAttr}>${childrenHtml}</${props.tagName}>`;
    return retVal;
  }

  getHtmlNode(props: HtmlNodeProps) {
    let node: HtmlTextNode | HtmlElement | HtmlLineBreak | null;

    if (typeof (props as HtmlTextNodeProps).text === "string") {
      node = new HtmlTextNode(props as HtmlTextNodeProps);
    } else if (typeof (props as HtmlElementProps).tagName === "string") {
      node = new HtmlElement(props as HtmlElementProps);
    } else {
      node = new HtmlLineBreak(props as HtmlLineBreakProps);
    }

    return node;
  }
}

export const cssPropsToString = (props: string, nlSpace: string) => {
  const propLines = props
    .split("\n")
    .filter((val) => !!val.trim())
    .map((val) => `${nlSpace}${val}`);

  const formatedProps = propLines.join("\n");
  return formatedProps;
};

export const cssSelectorsArrToString = (
  selectors: CssSelector[],
  nlSpace: string
) => {
  const nl = `, \n${nlSpace}`;
  const selectorsStrArr = selectors.map((sl) => cssSelectorToString(sl));

  const selectorsStr = selectorsStrArr.join(nl);
  return selectorsStrArr;
};

export const cssSelectorToString = (selector: CssSelector) => {
  let str = "";
  const { tag, className, id, pseudo, nested, nestedFirstChild } = selector;

  const strHasVal = (str: string | null | undefined) =>
    typeof str === "string" && str.length > 0;

  const appendPart = (part: string | null | undefined, pref: string) => {
    if (strHasVal(part)) {
      str += `${pref}${part}`;
    }
  };

  appendPart(tag, "");
  appendPart(className, ".");
  appendPart(id, "#");
  appendPart(pseudo, "::");

  if (nested) {
    const nestedStr = cssSelectorToString(nested);

    if (nestedFirstChild) {
      str += ` > ${nestedStr}`;
    } else {
      str += ` ${nestedStr}`;
    }
  }

  return str;
};

export interface CssSelector {
  tag?: string | null | undefined;
  className?: string | null | undefined;
  id?: string | null | undefined;
  pseudo?: string | null | undefined;

  nested?: CssSelector | null | undefined;
  nestedFirstChild?: boolean | null | undefined;
}

export class CssCodeCreator {
  readonly baseTabsCount: number;
  readonly tabSpacesCount: number;
  readonly tabStr: string;

  cssCode: string;

  constructor(
    baseTabsCount?: number | null | undefined,
    tabSpacesCount?: number | null | undefined
  ) {
    this.baseTabsCount = baseTabsCount ?? 2;
    this.tabSpacesCount = tabSpacesCount ?? 4;

    this.tabStr = generateConstantStr(this.tabSpacesCount, " ");
    this.cssCode = "";
  }

  public addProps(selectors: CssSelector[], props: string) {
    const cssCode = this.getPropsCssCode(selectors, props);
    this.cssCode += `${cssCode}\n\n`;
  }

  getPropsCssCode(selectors: CssSelector[], props: string) {
    const selectorCode = cssSelectorsArrToString(selectors, this.getTabs(0));
    const propsCode = cssPropsToString(props, this.getTabs(1));

    const cssCode = `${this.getTabs(0)}${selectorCode} {
${propsCode}
${this.getTabs(0)}}`;

    return cssCode;
  }

  getTabs(count: number) {
    const tabsStr = generateConstantStr(
      this.baseTabsCount + count,
      this.tabStr
    );

    return tabsStr;
  }
}

export const pageCssClasses = Object.freeze({
  tsCode: "ts-code",
  tsCodeRoot: "ts-code-root",
  tsSpace: "ts-space",
  tsOp: "ts-op",
  tsComment: "ts-comment",
  tsStrLit: "ts-str-lit",
  tsRegexLit: "ts-regex-lit",
  tsNumLit: "ts-num-lit",
  tsWord: "ts-word",
  tsRoundBracket: "ts-round-bracket",
  tsSquareBracket: "ts-square-bracket",
  tsCurlyBracket: "ts-curly-bracket",
});

export const getPageCss = () => {
  const cssCodeCreator = new CssCodeCreator();

  const addPropsForTag = (tagName: string, props: string) => {
    cssCodeCreator.addProps(
      [
        {
          tag: tagName,
        },
      ],
      props
    );
  };

  const addPropsForAllClasses = (classes: string[], props: string) => {
    cssCodeCreator.addProps(
      classes.map((cls) => {
        const cssSelector = {
          className: cls,
        } as CssSelector;

        return cssSelector;
      }),
      props
    );
  };

  const addPropsForTsCode = (
    className: string,
    props: string,
    pseudo?: string | null | undefined
  ) => {
    cssCodeCreator.addProps(
      [
        {
          className: pageCssClasses.tsCode,
          nested: {
            className: className,
            pseudo: pseudo,
          },
        },
      ],
      props
    );
  };

  cssCodeCreator.addProps(
    [
      {
        tag: "body",
      },
    ],
    "background-color: #000000ff;"
  );

  cssCodeCreator.addProps(
    [
      {
        tag: "header",
        nested: {
          tag: "p",
        },
        nestedFirstChild: true,
      },
      {
        tag: "footer",
        nested: {
          tag: "p",
        },
        nestedFirstChild: true,
      },
    ],
    `
text-align: left;
padding: 20px 20px;
background-color: #161616ff;
color: #e0e0e0ff;
font-style: italic;
font-size: 17px;
    `
  );

  addPropsForTag("body", "background-color: #000000ff;");

  addPropsForAllClasses(
    [pageCssClasses.tsCode, pageCssClasses.tsCodeRoot],
    `
text-align: left;
padding: 20px 20px;
`
  );

  addPropsForAllClasses(
    [pageCssClasses.tsCode],
    `
font-family: "Courier New", Courier, monospace;
font-size: 14px;
font-weight: bold;
width: 90%;
`
  );

  addPropsForTsCode(
    pageCssClasses.tsCodeRoot,
    `
width: 90%;
overflow-x: scroll;
background-color: #161616ff;
color: #e0e0e0ff;
`
  );

  addPropsForTsCode(
    pageCssClasses.tsCodeRoot,
    "width: 12px; /* width of the entire scrollbar */",
    "-webkit-scrollbar"
  );

  addPropsForTsCode(
    pageCssClasses.tsCodeRoot,
    "background: #161616ff; /* color of the tracking area */",
    "-webkit-scrollbar-track"
  );

  addPropsForTsCode(
    pageCssClasses.tsCodeRoot,
    `
background-color: black; /* color of the scroll thumb */
border-radius: 20px; /* roundness of the scroll thumb */
border: 3px solid #161616ff; /* creates padding around scroll thumb */
`,
    "-webkit-scrollbar-thumb"
  );

  addPropsForTsCode(
    pageCssClasses.tsCodeRoot,
    `
    background-color: black;
    border: 2px solid #161616ff;
    border-radius: 5px;
`,
    "-webkit-scrollbar-corner"
  );

  addPropsForTsCode(pageCssClasses.tsSpace, ``);
  addPropsForTsCode(pageCssClasses.tsOp, "color: #fff;");
  addPropsForTsCode(pageCssClasses.tsComment, "color: #080;");
  addPropsForTsCode(pageCssClasses.tsStrLit, "color: #a00;");
  addPropsForTsCode(pageCssClasses.tsRegexLit, "color: #a0a;");
  addPropsForTsCode(pageCssClasses.tsNumLit, "color: #9a9aff;");
  addPropsForTsCode(pageCssClasses.tsWord, "color: #6060ff;");
  addPropsForTsCode(pageCssClasses.tsRoundBracket, "color: #a52;");
  addPropsForTsCode(pageCssClasses.tsSquareBracket, "color: #c82;");
  addPropsForTsCode(pageCssClasses.tsCurlyBracket, "color: #fd2;");

  return cssCodeCreator.cssCode;
};

export const PAGE_CSS = getPageCss();
