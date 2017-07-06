const JSDOM = require('jsdom').JSDOM;

global.document = new JSDOM('<body></body>');
global.window = document.window;
global.navigator = window.navigator;