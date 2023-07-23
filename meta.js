import pkg from './package.json' assert {type: 'json'};

const production = !process.env.ROLLUP_WATCH;
const extraGrant = !production ? '// @grant GM_xmlhttpRequest' : '';

export default `
// ==UserScript==
// @name ${pkg.name}
// @description ${pkg.description}
// @version ${pkg.version}
// @author ${pkg.author}
// @icon https://www.google.com/s2/favicons?sz=64&domain=animelayer.ru
// @include /^https?://animelayer.ru/torrent/.*/
// @grant GM_setValue
// @grant GM_getValue\n${extraGrant}\n// ==/UserScript==
`;