// vendors
global.m = require("mithril");
global.m = require("mithril.elements");

// Services
import Helper from './Services/Helper.js';
import Server from './Services/Server.js';
import Config from './Services/Config.js';
import Localization from './Services/Localization.js';

Helper.init();
Server.init();
Config.init();
Localization.init();

// UI
require('./UI/UIController.jsx');

// APPS API
require('./AppsAPI/Main/API.js');