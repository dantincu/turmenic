import { TypescriptFileToHtml } from "./src/typscript-parser/to-html/typescript-to-html.js";

const converter = new TypescriptFileToHtml();
await converter.generate(process.argv[2], "./dist/output.html");

const reg = /\sasdfasdfasdfasdfasdf9as7df87a9sd8f7as9d8f79a8sd7f98as7df/g;

//asdfasdfasdf

const x = 123n;
const y = "asdfasdfasdf";

/* asdf
asdfasdfasdf
asdf */

const asdfasdfasdfasdfasdfasdf = 1;

const ret = "asdfasdf".match(/\s\s\s\s\s/g);
const arr = [
  1234123412341234123,
  asdfasdfasdfasdfasdfasdf,
  ret,
  /asdfasdf\s\s\s\s/g,
];
