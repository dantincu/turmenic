import {
  CodeParser,
  MultilineCodeParser,
} from "./src/code-parser/code-parser.js";
import { TypescriptCodeParser } from "./src/typscript-parser/typescript-code-parser.js";

import { CodeStreamParser } from "./src/code-parser/code-stream-parser.js";
import { TypescriptCodeStreamParser } from "./src/typscript-parser/typescript-code-stream-parser.js";
import { ParsedUrlQuery } from "node:querystring";

const parser = new TypescriptCodeStreamParser();
