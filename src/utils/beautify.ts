/**
 * vkBeautify - javascript plugin to pretty-print or minify text in XML, JSON, CSS and SQL formats.
 *
 * Copyright (c) 2012 Vadim Kiryukhin
 * vkiryukhin @ gmail.com
 * http://www.eslinstructor.net/vkbeautify/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 *   Pretty print
 *
 *        vkbeautify.xml(text [,indent_pattern]);
 *        vkbeautify.json(text [,indent_pattern]);
 *        vkbeautify.css(text [,indent_pattern]);
 *        vkbeautify.sql(text [,indent_pattern]);
 *
 *        @text - String; text to beatufy;
 *        @indent_pattern - Integer | String;
 *                Integer:  number of white spaces;
 *                String:   character string to visualize indentation ( can also be a set of white spaces )
 *   Minify
 *
 *        vkbeautify.xmlmin(text [,preserve_comments]);
 *        vkbeautify.jsonmin(text);
 *        vkbeautify.cssmin(text [,preserve_comments]);
 *        vkbeautify.sqlmin(text);
 *
 *        @text - String; text to minify;
 *        @preserve_comments - Bool; [optional];
 *                Set this flag to true to prevent removing comments from @text ( minxml and mincss functions only. )
 *
 *   Examples:
 *        vkbeautify.xml(text); // pretty print XML
 *        vkbeautify.json(text, 4 ); // pretty print JSON
 *        vkbeautify.css(text, '. . . .'); // pretty print CSS
 *        vkbeautify.sql(text, '----'); // pretty print SQL
 *
 *        vkbeautify.xmlmin(text, true);// minify XML, preserve comments
 *        vkbeautify.jsonmin(text);// minify JSON
 *        vkbeautify.cssmin(text);// minify CSS, remove comments ( default )
 *        vkbeautify.sqlmin(text);// minify SQL
 *
 */
function createShiftArr(step: number) {
  let space = '    ';

  if (isNaN(parseInt(step))) {
    // argument is string
    space = step;
  } else {
    // argument is integer
    switch (step) {
      case 1:
        space = ' ';
        break;
      case 2:
        space = '  ';
        break;
      case 3:
        space = '   ';
        break;
      case 4:
        space = '    ';
        break;
      case 5:
        space = '     ';
        break;
      case 6:
        space = '      ';
        break;
      case 7:
        space = '       ';
        break;
      case 8:
        space = '        ';
        break;
      case 9:
        space = '         ';
        break;
      case 10:
        space = '          ';
        break;
      case 11:
        space = '           ';
        break;
      case 12:
        space = '            ';
        break;
    }
  }

  const shift = ['\n']; // array of shifts
  for (let ix = 0; ix < 100; ix++) {
    shift.push(shift[ix] + space);
  }
  return shift;
}

function vkbeautify() {
  this.step = '    '; // 4 spaces
  this.shift = createShiftArr(this.step);
}

vkbeautify.prototype.xml = function (text: string, step: number) {
  const ar = text
    .replace(/>\s{0,}</g, '><')
    .replace(/</g, '~::~<')
    .replace(/\s*xmlns\:/g, '~::~xmlns:')
    .replace(/\s*xmlns\=/g, '~::~xmlns=')
    .split('~::~');
  const len = ar.length;
  let inComment = false;
  let deep = 0;
  let str = '';
  let ix = 0;
  const shift = step ? createShiftArr(step) : this.shift;

  for (ix = 0; ix < len; ix++) {
    // start comment or <![CDATA[...]]> or <!DOCTYPE //
    if (ar[ix].search(/<!/) > -1) {
      str += shift[deep] + ar[ix];
      inComment = true;
      // end comment  or <![CDATA[...]]> //
      if (
        ar[ix].search(/-->/) > -1 ||
        ar[ix].search(/\]>/) > -1 ||
        ar[ix].search(/!DOCTYPE/) > -1
      ) {
        inComment = false;
      }
    }
    // end comment  or <![CDATA[...]]> //
    else if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
      str += ar[ix];
      inComment = false;
    }
    // <elm></elm> //
    else if (
      /^<\w/.exec(ar[ix - 1]) &&
      /^<\/\w/.exec(ar[ix]) &&
      /^<[\w:\-\.\,]+/.exec(ar[ix - 1]) ===
        /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/', '')
    ) {
      str += ar[ix];
      if (!inComment) deep--;
    }
    // <elm> //
    else if (
      ar[ix].search(/<\w/) > -1 &&
      ar[ix].search(/<\//) === -1 &&
      ar[ix].search(/\/>/) === -1
    ) {
      str = !inComment ? (str += shift[deep++] + ar[ix]) : (str += ar[ix]);
    }
    // <elm>...</elm> //
    else if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
      str = !inComment ? (str += shift[deep] + ar[ix]) : (str += ar[ix]);
    }
    // </elm> //
    else if (ar[ix].search(/<\//) > -1) {
      str = !inComment ? (str += shift[--deep] + ar[ix]) : (str += ar[ix]);
    }
    // <elm/> //
    else if (ar[ix].search(/\/>/) > -1) {
      str = !inComment ? (str += shift[deep] + ar[ix]) : (str += ar[ix]);
    }
    // <? xml ... ?> //
    else if (ar[ix].search(/<\?/) > -1) {
      str += shift[deep] + ar[ix];
    }
    // xmlns //
    else if (ar[ix].search(/xmlns\:/) > -1 || ar[ix].search(/xmlns\=/) > -1) {
      str += shift[deep] + ar[ix];
    } else {
      str += ar[ix];
    }
  }

  return str[0] === '\n' ? str.slice(1) : str;
};

vkbeautify.prototype.json = function (text, step) {
  step = step ? step : this.step;

  if (typeof JSON === 'undefined') return text;

  if (typeof text === 'string')
    return JSON.stringify(JSON.parse(text), null, step);
  if (typeof text === 'object') return JSON.stringify(text, null, step);

  return text; // text is not string nor object
};

vkbeautify.prototype.css = function (text: string, step: number) {
  const ar = text
    .replace(/\s{1,}/g, ' ')
    .replace(/\{/g, '{~::~')
    .replace(/\}/g, '~::~}~::~')
    .replace(/\;/g, ';~::~')
    .replace(/\/\*/g, '~::~/*')
    .replace(/\*\//g, '*/~::~')
    .replace(/~::~\s{0,}~::~/g, '~::~')
    .split('~::~');

  const len = ar.length;
  let deep = 0;
  let str = '';
  let ix = 0;
  const shift = step ? createShiftArr(step) : this.shift;

  for (ix = 0; ix < len; ix++) {
    if (/\{/.exec(ar[ix])) {
      str += shift[deep++] + ar[ix];
    } else if (/\}/.exec(ar[ix])) {
      str += shift[--deep] + ar[ix];
    } else if (/\*\\/.exec(ar[ix])) {
      str += shift[deep] + ar[ix];
    } else {
      str += shift[deep] + ar[ix];
    }
  }
  return str.replace(/^\n{1,}/, '');
};

//----------------------------------------------------------------------------

function isSubquery(str: string, parenthesisLevel: number) {
  return (
    parenthesisLevel -
    (str.replace(/\(/g, '').length - str.replace(/\)/g, '').length)
  );
}

function split_sql(str: string, tab) {
  return (
    str
      .replace(/\s{1,}/g, ' ')

      .replace(/ AND /gi, '~::~' + tab + tab + 'AND ')
      .replace(/ BETWEEN /gi, '~::~' + tab + 'BETWEEN ')
      .replace(/ CASE /gi, '~::~' + tab + 'CASE ')
      .replace(/ ELSE /gi, '~::~' + tab + 'ELSE ')
      .replace(/ END /gi, '~::~' + tab + 'END ')
      .replace(/ FROM /gi, '~::~FROM ')
      .replace(/ GROUP\s{1,}BY/gi, '~::~GROUP BY ')
      .replace(/ HAVING /gi, '~::~HAVING ')
      //.replace(/ SET /ig," SET~::~")
      .replace(/ IN /gi, ' IN ')

      .replace(/ JOIN /gi, '~::~JOIN ')
      .replace(/ CROSS~::~{1,}JOIN /gi, '~::~CROSS JOIN ')
      .replace(/ INNER~::~{1,}JOIN /gi, '~::~INNER JOIN ')
      .replace(/ LEFT~::~{1,}JOIN /gi, '~::~LEFT JOIN ')
      .replace(/ RIGHT~::~{1,}JOIN /gi, '~::~RIGHT JOIN ')

      .replace(/ ON /gi, '~::~' + tab + 'ON ')
      .replace(/ OR /gi, '~::~' + tab + tab + 'OR ')
      .replace(/ ORDER\s{1,}BY/gi, '~::~ORDER BY ')
      .replace(/ OVER /gi, '~::~' + tab + 'OVER ')

      .replace(/\(\s{0,}SELECT /gi, '~::~(SELECT ')
      .replace(/\)\s{0,}SELECT /gi, ')~::~SELECT ')

      .replace(/ THEN /gi, ' THEN~::~' + tab + '')
      .replace(/ UNION /gi, '~::~UNION~::~')
      .replace(/ USING /gi, '~::~USING ')
      .replace(/ WHEN /gi, '~::~' + tab + 'WHEN ')
      .replace(/ WHERE /gi, '~::~WHERE ')
      .replace(/ WITH /gi, '~::~WITH ')

      //.replace(/\,\s{0,}\(/ig,",~::~( ")
      //.replace(/\,/ig,",~::~"+tab+tab+"")

      .replace(/ ALL /gi, ' ALL ')
      .replace(/ AS /gi, ' AS ')
      .replace(/ ASC /gi, ' ASC ')
      .replace(/ DESC /gi, ' DESC ')
      .replace(/ DISTINCT /gi, ' DISTINCT ')
      .replace(/ EXISTS /gi, ' EXISTS ')
      .replace(/ NOT /gi, ' NOT ')
      .replace(/ NULL /gi, ' NULL ')
      .replace(/ LIKE /gi, ' LIKE ')
      .replace(/\s{0,}SELECT /gi, 'SELECT ')
      .replace(/\s{0,}UPDATE /gi, 'UPDATE ')
      .replace(/ SET /gi, ' SET ')

      .replace(/~::~{1,}/g, '~::~')
      .split('~::~')
  );
}

vkbeautify.prototype.sql = function (text, step) {
  const arByQuote = text
    .replace(/\s{1,}/g, ' ')
    .replace(/\'/gi, "~::~'")
    .split('~::~');
  let len = arByQuote.length;
  let ar: any[] = [];
  let deep = 0;
  const tab = this.step; //+this.step,
  // const inComment = true;
  // const inQuote = false;
  let parenthesisLevel = 0;
  let str = '';
  let ix = 0;
  const shift = step ? createShiftArr(step) : this.shift;

  for (ix = 0; ix < len; ix++) {
    if (ix % 2) {
      ar = ar.concat(arByQuote[ix]);
    } else {
      ar = ar.concat(split_sql(arByQuote[ix], tab));
    }
  }

  len = ar.length;
  for (ix = 0; ix < len; ix++) {
    parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);

    if (/\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix])) {
      ar[ix] = ar[ix].replace(/\,/g, ',\n' + tab + tab + '');
    }

    if (/\s{0,}\s{0,}SET\s{0,}/.exec(ar[ix])) {
      ar[ix] = ar[ix].replace(/\,/g, ',\n' + tab + tab + '');
    }

    if (/\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix])) {
      deep++;
      str += shift[deep] + ar[ix];
    } else if (/\'/.exec(ar[ix])) {
      if (parenthesisLevel < 1 && deep) {
        deep--;
      }
      str += ar[ix];
    } else {
      str += shift[deep] + ar[ix];
      if (parenthesisLevel < 1 && deep) {
        deep--;
      }
    }
  }

  str = str.replace(/^\n{1,}/, '').replace(/\n{1,}/g, '\n');
  return str;
};

vkbeautify.prototype.xmlmin = function (text, preserveComments) {
  const str = preserveComments
    ? text
    : text
        .replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, '')
        .replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns');
  return str.replace(/>\s{0,}</g, '><');
};

vkbeautify.prototype.jsonmin = function (text: string) {
  if (typeof JSON === 'undefined') return text;

  return JSON.stringify(JSON.parse(text), null, 0);
};

vkbeautify.prototype.cssmin = function (text: string, preserveComments: any) {
  const str = preserveComments
    ? text
    : text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, '');

  return str
    .replace(/\s{1,}/g, ' ')
    .replace(/\{\s{1,}/g, '{')
    .replace(/\}\s{1,}/g, '}')
    .replace(/\;\s{1,}/g, ';')
    .replace(/\/\*\s{1,}/g, '/*')
    .replace(/\*\/\s{1,}/g, '*/');
};

vkbeautify.prototype.sqlmin = function (text: string) {
  return text
    .replace(/\s{1,}/g, ' ')
    .replace(/\s{1,}\(/, '(')
    .replace(/\s{1,}\)/, ')');
};

export default new vkbeautify();
