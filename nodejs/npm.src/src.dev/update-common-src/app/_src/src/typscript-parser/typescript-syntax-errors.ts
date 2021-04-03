import { CodeSyntaxError } from "../code-parser/code-parser.base.js";

export class TypescriptErrorCodes {
  errorCodes: CodeSyntaxError[];

  constructor() {
    this.errorCodes = this.getErrorCodes();
  }

  public getError(
    errCode: number,
    errMsg?: string | null | undefined,
    errCodeStr?: string | null | undefined
  ) {
    let err = this.errorCodes.find((err) => err.errCode === errCode);

    if (err) {
      err = { ...err };
      err.errMsg = errMsg ?? err.errMsg;
      err.errCodeStr = errCodeStr ?? err.errCodeStr;
    } else {
      throw new Error(`Typescript error code not found: ${errCode}`);
    }

    return err;
  }

  getErrorCodes() {
    const errorCodes: CodeSyntaxError[] = [];
    return errorCodes;
  }
}

export const typescriptErrorCodes = new TypescriptErrorCodes();
