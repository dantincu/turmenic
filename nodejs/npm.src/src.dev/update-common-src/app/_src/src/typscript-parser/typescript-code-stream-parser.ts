import {
  CodeCharType,
  CodeSyntaxError,
  BasicCodeFragment,
  isAllWhiteSpace,
  endsWithWhiteSpace,
  CodeFragment,
  containsNewLine,
  assureInputCharIsValid,
} from "../code-parser/code-parser.base.js";

import {
  TypescriptCodeParserState,
  TsCodeFrag,
  getBlankParserState,
  ArgDefExpr,
  TsArrValDefExpr,
  TsAssignmentStatement,
  TsClassDefStatement,
  TsClassPropStatement,
  TsCompositeRightHandOpExpr,
  TsCompositeTypeDefExpr,
  TsEnumDefStatement,
  TsExportStatement,
  TsHashValDefExpr,
  TsImportStatement,
  TsIndexTypeDefExpr,
  TsInterfaceDefStatement,
  TsLeftHandOpExpr,
  TsLitVal,
  TsMethodArgsDefExpr,
  TsMethodCallExpr,
  TsMethodCallStatement,
  TsMethodDefExpr,
  TsNamespaceStatement,
  TsRightHandOpExpr,
  TsRightHandValueType,
  TsTypeAliasStatement,
  TsTypeDefExpr,
  TsVarDefExpr,
  TsVarExpr,
} from "./typescript.js";
import { TypescriptErrorCodes } from "./typescript-syntax-errors.js";
import { isBasicNewLineChar } from "../../src.common/text/new-line.js";

import {
  CharReceivedData,
  PrevCharData,
  TestCharsData,
  TypescriptCodeStreamParserBase,
} from "./typescript-code-stream-parser.base.js";

export class TypescriptCodeStreamParser extends TypescriptCodeStreamParserBase {
  constructor() {
    super();
  }

  handleCode(data: CharReceivedData, parserState: TypescriptCodeParserState) {
      
  }
}
