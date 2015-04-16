var _isReady = false;
var _lang = 'en-US';
/**
 * [langsList languages to import]
 * @type {Array}
 */
var langsList = ['ru', 'en-US', 'ja'];
var langs = {};


export default class Localization {
	/**
	 * [init Init localization]
	 */
	static init() {
		window.Localization = Localization;
		window.l = Localization.l;
		_lang = window.navigator.userLanguage || window.navigator.language;
		Localization._importLags();
		_isReady = true;
	}
	/**
	 * [l Localize string]
	 * @param  String string to localize
	 * @param  String params #1 to replace
	 * @param  String params #2 to replace
	 * @param  String ...
	 * @return String
	 */
	static l(s) {
		var tpl = langs[_lang][s.toLowerCase()] || '####';

		if(arguments.length > 1) {
			for(var i in arguments) {
				if(i !== 0) {
					tpl = tpl.replace('%'+i, arguments[i]);
				}
			}
		}

		if(s[0] === s[0].toUpperCase()) {
			tpl = tpl[0].toUpperCase() + tpl.slice(1);
		}
		return tpl;
	}

	/**
	 * [_importLags require all langs]
	 */
	static _importLags() {
		for(var l of langsList) {
			langs[l] = require('../../langs/'+ l +'.js').default;
		}
	}

	/**
	 * [setLang change language]
	 * @param String language
	 */
	static setLang(lang) {
		_lang = lang;
	}
}