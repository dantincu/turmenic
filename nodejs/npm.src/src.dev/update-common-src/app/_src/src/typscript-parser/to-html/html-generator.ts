import { isBasicNewLineChar } from "../../../src.common/text/new-line.js";
import { encodeHtml } from "../../../src.node.common/text/html-pre.js";
import { TypescriptCodeParserState } from "../typescript.js";
import {
  CharReceivedData,
  PrevCharData,
  TestCharsData,
  TypescriptCodeStreamParserBase,
} from "../typescript-code-stream-parser.base.js";

import { DEFAULT_OP_SYMBOLS } from "../../code-parser/code-parser.base.js";

import {
  HtmlElement,
  HtmlNodeProps,
  HtmlPageCreator,
  HtmlElementProps,
  HtmlLineBreak,
  HtmlLineBreakProps,
  HtmlNode,
  HtmlPageData,
  HtmlTextNode,
  HtmlTextNodeProps,
  PAGE_CSS,
  pageCssClasses,
} from "./html.js";

export interface ParserStateCondition {
  condition: (parserState: TypescriptCodeParserState) => boolean;
  className: string;
}

export interface SpecialCharCondition {
  condition: (char: string) => boolean;
  className: string;
}

export class CodeHtmlGenerator {
  rootElProps: HtmlElementProps;
  currentElProps: HtmlElementProps;
  currentTextNodeProps: HtmlTextNodeProps;

  isLitOrCom: boolean;
  prevChar: string | null;

  readonly parserStateConditions: ParserStateCondition[];
  readonly specialCharConditions: SpecialCharCondition[];

  constructor() {
    this.rootElProps = this.getDefaultEl("p");
    this.rootElProps.className = pageCssClasses.tsCodeRoot;

    this.currentElProps = this.createCurrentEl();
    this.currentTextNodeProps = this.createCurrentTextNode();

    this.isLitOrCom = false;
    this.prevChar = null;

    this.parserStateConditions = this.getParserStateConditions();
    this.specialCharConditions = this.getSpecialCharConditions();
  }

  public getHtml(): string | null {
    const rootEl = new HtmlElement(this.rootElProps);
    const html = rootEl.toString();

    return html;
  }

  public addChar(
    data: CharReceivedData,
    parserState: TypescriptCodeParserState
  ) {
    if (this.isLitOrCom === false) {
      if (this.handleNormalParserStateConditionsArr(parserState) === false) {
        this.handleSpecialCharConditionsArr(data);
      }
    } else {
      this.handleLitOrComParserStateConditionsArr(parserState);
    }

    this.prevChar = data.char;
    this.currentTextNodeProps.text += data.char;
  }

  handleNormalParserStateConditionsArr(parserState: TypescriptCodeParserState) {
    let matched = false;

    this.parserStateConditions.forEach((cond) => {
      if (matched === false && cond.condition(parserState)) {
        this.flushCurrentEl();
        this.currentElProps.className = cond.className;

        this.isLitOrCom = true;
        matched = true;
      }
    });

    return matched;
  }

  handleLitOrComParserStateConditionsArr(
    parserState: TypescriptCodeParserState
  ) {
    let matched = false;

    this.parserStateConditions.forEach((cond) => {
      if (matched === false && cond.condition(parserState) === false) {
        this.flushCurrentEl();
        this.currentElProps.className = pageCssClasses.tsWord;

        this.isLitOrCom = false;
        matched = true;
      }
    });
  }

  handleSpecialCharConditionsArr(data: CharReceivedData) {
    let matched = false;
    let prevChar = this.prevChar ?? "";

    this.specialCharConditions.forEach((cond) => {
      if (matched === false && cond.condition(data.char)) {
        if (cond.condition(prevChar) === false) {
          this.flushCurrentEl();

          this.currentElProps.className = cond.className;
          matched = true;
        }
      }
    });

    if (
      matched === false &&
      this.specialCharConditions.find((cond) => cond.condition(prevChar))
    ) {
      this.flushCurrentEl();
      this.currentElProps.className = pageCssClasses.tsWord;
    }
  }

  handleSpecialChar(
    data: CharReceivedData,
    prevChar: string,
    condition: (char: string) => boolean,
    className: string
  ) {
    let retVal = condition(data.char);

    if (retVal) {
      if (condition(prevChar) === false) {
        this.flushCurrentEl();
      }

      this.currentElProps.className = className;
    }

    return retVal;
  }

  flushCurrentEl() {
    this.currentElProps.children.push(this.currentTextNodeProps);
    this.currentElProps.parentElement?.children.push(this.currentElProps);
    this.currentElProps = this.createCurrentEl();
    this.currentTextNodeProps = this.createCurrentTextNode();
  }

  createCurrentEl(level?: number | null | undefined): HtmlElementProps {
    level = level ?? 0;
    let currentElProps = this.getDefaultEl();

    if (this.currentElProps) {
      if (level < 0) {
        if (!!this.currentElProps.parentElement?.parentElement === false) {
          throw new Error(
            "Could not climb further up the hierarchy tree because the current parent's parent is null or undefined"
          );
        }
        currentElProps.parentElement = this.currentElProps.parentElement?.parentElement;
      } else if (level > 0) {
        currentElProps.parentElement = this.currentElProps;
      } else {
        currentElProps.parentElement = this.currentElProps.parentElement;
      }
    } else {
      currentElProps.parentElement = this.rootElProps;
    }

    return currentElProps;
  }

  createCurrentTextNode() {
    const textNode = {
      text: "",
      parentElement: this.currentElProps,
    } as HtmlTextNodeProps;

    return textNode;
  }

  getDefaultEl(tagName?: string | null | undefined): HtmlElementProps {
    tagName = tagName ?? "span";

    const el: HtmlElementProps = {
      tagName: tagName,
      children: [],
    };

    return el;
  }

  getParserStateConditions() {
    const arr: ParserStateCondition[] = [
      {
        condition: (parserState) =>
          parserState.isMlComment || parserState.isSlComment,
        className: pageCssClasses.tsComment,
      },
      {
        condition: (parserState) =>
          parserState.isSqStrLit ||
          parserState.isDqStrLit ||
          parserState.isMlStrLit,
        className: pageCssClasses.tsStrLit,
      },
      {
        condition: (parserState) => parserState.isRegexpLit,
        className: pageCssClasses.tsRegexLit,
      },
    ];

    return arr;
  }

  getSpecialCharConditions() {
    const arr: SpecialCharCondition[] = [
      {
        condition: (char) => DEFAULT_OP_SYMBOLS.indexOf(char) >= 0,
        className: pageCssClasses.tsOp,
      },
      {
        condition: (char) => !!char.match(/\d/g),
        className: pageCssClasses.tsNumLit,
      },
      {
        condition: (char) => ["()"].indexOf(char) >= 0,
        className: pageCssClasses.tsRoundBracket,
      },
      {
        condition: (char) => ["[]"].indexOf(char) >= 0,
        className: pageCssClasses.tsSquareBracket,
      },
      {
        condition: (char) => ["{}"].indexOf(char) >= 0,
        className: pageCssClasses.tsCurlyBracket,
      },
    ];

    return arr;
  }

  /* flushCurrentEl(
    data: CharReceivedData,
    parserState: TypescriptCodeParserState
  ) {
    if (
      typeof this.prevChar !== "string" ||
      isBasicNewLineChar(this.prevChar) === false
    ) {
      this.currentElProps.parentElement?.children.push(this.currentElProps);
    }

    this.currentElProps = this.createCurrentEl();

    if (isBasicNewLineChar(data.char)) {
      this.currentElProps.parentElement?.children.push(this.getNewLineEl());
    } else if (data.char === " ") {
      this.currentElProps.parentElement?.children.push(this.getSpaceEl());
    } else {
      this.currentElProps.children.push({
        text: data.char,
        parentElement: this.currentElProps,
      } as HtmlTextNodeProps);
    }
  }
  
  getNewLineEl(): HtmlLineBreakProps {
    const el = {
      parentElement: this.rootElProps,
    } as HtmlLineBreakProps;
    return el;
  }
  
  getSpaceEl(): HtmlElementProps {
    const el = {
      tagName: "span",
      children: [],
      className: "ts-space",
      parentElement: this.rootElProps,
    } as HtmlElementProps;

    el.children.push({
      text: "&nbsp;",
    } as HtmlTextNodeProps);

    return el;
  } */
}
