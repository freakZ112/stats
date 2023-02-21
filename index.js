// ==UserScript==
// @name        Fuhrpark-neu
// @version     v 3.0.0 - 20211025-01-kopie
// @author      freakZ112
// @description  Zeigt den kompletten Fuhrpark, sowie diverse Statistiken
// @include      /^https?:\/\/(?:w{3}\.)?(?:polizei\.)?leitstellenspiel\.de\/$/
// @grant       GM_addStyle
// ==/UserScript==

(function() {
    const head = document.head || document.getElementsByTagName('head')[0],
        s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://scripts.drtraxx.de/fuhrparkmanager/index.js?_=' + new Date().getTime(); /* live */
    head.appendChild(s);
})();
