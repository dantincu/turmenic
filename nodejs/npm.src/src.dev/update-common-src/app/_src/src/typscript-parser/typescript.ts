import { GenericHash } from "../../src.common/utils/types.js";

import {
  BasicCodeFragment,
  CodeSyntaxError,
  CodeCharType,
  CodeFragment,
  containsWhiteSpace,
  endsWithWhiteSpace,
  isAllWhiteSpace,
  startsWithWhiteSpace,
} from "../code-parser/code-parser.base.js";

export interface TypescriptCodeParserState {
  isSlComment: boolean;
  isMlComment: boolean;
  isSqStrLit: boolean;
  isDqStrLit: boolean;
  isMlStrLit: boolean;
  isRegexpLit: boolean;
  openParens: string[];
  parensNotMatchingIdx?: number | null | undefined;
}

export const getBlankParserState = () => {
  const parserState = {
    isSlComment: false,
    isMlComment: false,
    isSqStrLit: false,
    isDqStrLit: false,
    isMlStrLit: false,
    isRegexpLit: false,
    openParens: [],
  } as TypescriptCodeParserState;

  return parserState;
};

export interface TsCodeFrag {
  code: string;
  isComplete?: boolean | null | undefined;
  err?: CodeSyntaxError | null | undefined;
}

export interface TsLitVal extends TsCodeFrag {
  isNull?: boolean | null | undefined;
  isUndefined?: boolean | null | undefined;
  isNaN?: boolean | null | undefined;
  strLitVal?: string | null | number;
  numValStr?: string | null | number;
  regexpValStr?: string | null | number;
}

export interface TsArrValDefExpr extends TsCodeFrag {
  arrValues: TsRightHandOpExpr[];
}

export interface TsHashValDefExpr extends TsCodeFrag {
  propsHash: GenericHash<TsRightHandOpExpr | TsCompositeRightHandOpExpr>;
}

export interface TsMethodCallExpr extends TsCodeFrag {
  anonymousMethod?: TsMethodDefExpr | null | undefined;
  method?: TsLeftHandOpExpr | null | undefined;
  args?: TsRightHandOpExpr[];
}

export interface TsVarExpr extends TsCodeFrag {
  name: string;
  dotPropName?: string | null | undefined;
  hashPropName?: string | null | undefined;
  arrIdx?: string | null | undefined;
  nested?: TsVarExpr | null | undefined;
}

export interface TsLeftHandOpExpr extends TsCodeFrag {
  var: TsVarExpr;
}

export interface TsRightHandOpExpr extends TsCodeFrag {
  prcOpSymbols?: string | null | undefined;
  litVal?: TsLitVal | null | undefined;
  varVal?: TsVarExpr | null | undefined;
  arrVal?: TsArrValDefExpr | null | undefined;
  hashVal?: TsHashValDefExpr | null | undefined;
  methodCall?: TsMethodCallExpr | null | undefined;
  methodExpr?: TsMethodDefExpr | null | undefined;
}

export interface TsCompositeRightHandOpExpr extends TsCodeFrag {
  prcOpSymbols?: string | null | undefined;
  roundBrackets?: boolean | null | undefined;
  oppArr: (string | TsRightHandOpExpr | TsCompositeRightHandOpExpr)[];
}

export type TsRightHandValueType =
  | string
  | TsLitVal
  | TsArrValDefExpr
  | TsHashValDefExpr
  | TsTypeDefExpr
  | TsRightHandOpExpr
  | TsCompositeRightHandOpExpr;

export interface ArgDefExpr extends TsCodeFrag {
  argName: string;
  argValueType: TsRightHandValueType;
}

export interface TsVarDefExpr extends TsCodeFrag {
  isConst?: boolean | null | undefined;
  isLet?: boolean | null | undefined;
  isVar?: boolean | null | undefined;
  name?: string;
  arrDestructuringNames?: string[] | null | undefined;
  hashDestructuringNames?: string[] | null | undefined;
}

export interface TsTypeDefExpr extends TsCodeFrag {
  index?: TsIndexTypeDefExpr | null | undefined;
  propsHash?: GenericHash<TsRightHandValueType>;
  isArrayType?: boolean | null | undefined;
}

export interface TsCompositeTypeDefExpr extends TsCodeFrag {
  roundBrackets?: boolean | null | undefined;
  oppArr: (string | TsTypeDefExpr | TsCompositeTypeDefExpr)[];
}

export interface TsIndexTypeDefExpr extends TsCodeFrag {
  keyPropName: string;
  keyPropTypeStr: string;
  valPropType: TsRightHandValueType;
}

export interface TsAssignmentStatement extends TsCodeFrag {
  leftHandOp?: TsLeftHandOpExpr | null | undefined;
  arrDestructuringNames?: string[] | null | undefined;
  hashDestructuringNames?: string[] | null | undefined;
  rightHandOp?:
    | TsRightHandOpExpr
    | TsCompositeRightHandOpExpr
    | null
    | undefined;
}

export interface TsMethodArgsDefExpr extends TsCodeFrag {}

export interface TsMethodDefExpr extends TsCodeFrag {
  methodName?: string | null | undefined;
  isArrowMethod: boolean;
  args: ArgDefExpr[];
}

export interface TsMethodCallStatement extends TsCodeFrag {
  methodCall: TsMethodCallExpr;
}

export interface TsClassPropStatement extends TsCodeFrag {}

export interface TsClassDefStatement extends TsCodeFrag {}

export interface TsInterfaceDefStatement extends TsCodeFrag {}

export interface TsEnumDefStatement extends TsCodeFrag {}

export interface TsTypeAliasStatement extends TsCodeFrag {}

export interface TsNamespaceStatement extends TsCodeFrag {
  nestedFragsArr: TsCodeFrag[];
}

export interface TsImportStatement extends TsCodeFrag {
  filePath: string;
  all?: boolean | null | undefined;
  allAsAlias?: string | null | undefined;
  named?: GenericHash<string> | null | undefined;
}

export interface TsExportStatement extends TsCodeFrag {
  isDefault?: boolean | null | undefined;
  name?: string | null | undefined;
  value: TsRightHandOpExpr | TsCompositeRightHandOpExpr;
}

/*
export type A = TsNamespaceDefStatement | TsTypeDefStatement;
export namespace B {}
*/
/*
export interface TypescriptNameImports {
  namedImports: (string | { name: string; alias: string })[];
}

export interface TypescriptImportStatement extends TypescriptCodeFragment {
  defaultImport?: string | null | undefined;
  namedImports?: TypescriptNameImports | null | undefined;
  allAsAlias?: string | null | undefined;
}
export interface TypescriptNestedFragment extends TypescriptCodeFragment {
  openingBracket: string; // {or[or( without<
}
*/
