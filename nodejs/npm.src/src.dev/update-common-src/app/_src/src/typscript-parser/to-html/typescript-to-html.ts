import { readFileAsync } from "../../../src.node.common/fileSystem/types.js";

import {
  CharReceivedData,
  TypescriptCodeStreamParserBase,
} from "../typescript-code-stream-parser.base.js";
import { TypescriptCodeParserState } from "../typescript.js";
import {
  CodeHtmlGenerator,
  ParserStateCondition,
  SpecialCharCondition,
} from "./html-generator.js";

import { HtmlPageCreator, PAGE_CSS } from "./html.js";

class TypescriptCodeStreamParser extends TypescriptCodeStreamParserBase {
  constructor() {
    super();
  }

  handleCode(
    data: CharReceivedData,
    parserState: TypescriptCodeParserState
  ): void {}
}

export class TypescriptFileToHtml {
  constructor() {}

  public async generate(tsFilePath: string, htmlFilePath: string) {
    const rawCode = (await readFileAsync(tsFilePath)).toString();
    const parser = new TypescriptCodeStreamParser();

    const htmlGenerator = new CodeHtmlGenerator();
    const pageCreator = new HtmlPageCreator();

    for (let i = 0; i < rawCode.length; i++) {
      const char = rawCode[i];
      const data = parser.charReceived(char);

      const parserState = parser.parserState;
      htmlGenerator.addChar(data, parserState);
    }

    const html = htmlGenerator.getHtml();
    await pageCreator.createHtmlPage({
      authorName: "Daniel Tincu",
      filePath: htmlFilePath,
      htmlContent: {
        main: html ?? "",
        header: `<p>${tsFilePath}</p>`,
        footer: `<p>${this.getDateTimeStr()}</p>`,
      },
      pageDescription: "Sample typescript code parsed and converted to html",
      pageTitle: "Typescript parser & html converter",
      htmlPageCss: PAGE_CSS,
    });
  }

  getDateTimeStr(date?: Date | null | undefined) {
    date = date ?? new Date();
    const str = `${date.toUTCString()} ${date.getUTCMilliseconds()}`;

    return str;
  }
}
