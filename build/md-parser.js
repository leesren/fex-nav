/* eslint-disable */

var marked = require('marked');
const fse = require('fs-extra');
const path = require('path');
var renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

// Synchronous highlighting with highlight.js
// marked.setOptions({
//   highlight: function(code) {
//     return require('highlight.js').highlightAuto(code).value;
//   }
// });

// renderer.table = function(header, body) {
//   return '<table class="table table-striped">\n'
//     + '<thead>\n'
//     + header
//     + '</thead>\n'
//     + '<tbody>\n'
//     + body
//     + '</tbody>\n'
//     + '</table>\n';
// };

renderer.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  if (href && href[0] === '#') {
    href =
      '#' +
      encodeURIComponent(
        href
          .substring(1)
          .toLowerCase()
          .replace(/[^\u4e00-\u9fa5_a-zA-Z0-9]+/g, '-')
      );
  }

  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

module.exports = function() {
  const mkNav = path.resolve(__dirname, `../docs-md/navbar.md`);
  let content = fse.readFileSync(mkNav, { encoding: 'utf-8' });
  let data = marked(content);
  data = data
    .replace(`<pre><code class="language-js">`, '')
    .replace(`</code></pre>`, '')
    .replace(/&#39;/g, '"');
  eval.call(this, data);
  const result = buildNav(navList);

  return {
    nav: result.map(el => el.nav).join(''),
    bodyContent: result.map(el => el.body).join('')
  };
};

function buildNav(navLs = []) {
  return navLs.map((el, index) => {
    const navContent = `
        <li id="${el.link}" class="${index === 0 ? 'active' : ''}">
            <a>
                <i class="${
                  !el.icon ? el.ionic : 'iconfont ' + el.icon
                } "></i>${el.title}
            </a>
        </li>
        `;
    const mkNav = path.resolve(__dirname, `../docs-md/content/${el.link}.md`);
    let content = fse.readFileSync(mkNav, { encoding: 'utf-8' });
    content = marked(content);
    content = content
      .replace(`<pre><code class="language-js">`, '')
      .replace(`</code></pre>`, '')
      .replace(/&#39;/g, '"');
    eval.call(this, content);
    const body = buildContent(list);

    const res = {
      nav: navContent,
      body: warpContent(el, body)
    };
    return res;
  });
}
function warpContent(info, content) {
  return `   
  <div class="fe" id="Item-${info.link}">
    <div class="sub-category">
      <div>
        <i class="iconfont ${info.icon}"></i>
        ${info.title}
      </div>
    </div>
    <div>   
      ${content}
    </div>
  </div>
  `;
}
function logoHandle(url = '') {
  const name = url.split('/').slice(-1);
  return /^http(s)*:/.test(url)
    ? url
    : /^.\/assets\/images/.test(url)
    ? url
    : `http://www.alloyteam.com/nav/static/images/${name[0]}`;
}

function buildContent(ls = []) {
  return ls
    .map((el, index) => {
      if (el.link)
        return `
        <a target="_blank" href="${el.link}">
            <div class="item">
                <div class="logo">
                <img width="100%" class="loaded"
                    src="${logoHandle(el.logo)}">
                ${el.title}
                </div>

                <div class="desc" title="${el.desc}">
                ${el.desc}
                </div>
            </div>
        </a>
        `;
      return `
        <div class="item big-logo">
              <p class="title">${el.title}</p>
              <div class="logo">
                <img class="loaded" src="${logoHandle(el.logo)}">
              </div>
              <div class="desc" title="${el.desc}">
                <p>${el.desc}</p>
              </div>
            </div> 
        `;
    })
    .join('');
}
