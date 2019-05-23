const markedParse = require('./md-parser');
const fse = require('fs-extra');
const path = require('path');

function buildHtml() {
  const mkNav = path.resolve(__dirname, '../docs-md/navbar.md');

  const { nav, bodyContent } = markedParse();

  const indexHTML = path.resolve(__dirname, '../docs/index-tmp.html');
  const destIndexHTML = path.resolve(__dirname, '../docs/index.html');

  let indexHTMLContent = fse.readFileSync(indexHTML, { encoding: 'utf-8' });

  indexHTMLContent = indexHTMLContent
    .replace(/\$\$SideBarContent/g, nav)
    .replace(/\$\$mainContent/g, bodyContent);

  fse.writeFileSync(destIndexHTML, indexHTMLContent);
}
buildHtml();
module.exports = buildHtml;
