'use strict';

$.locales       = Object.create(null);
$.currentLocale = Object.create(null);

/**
 * Load current selected language.
 *
 * @return void
 */
function loadLocales() {
    for (const lang in $.locales) {
        if (!isEmpty($.locales[lang])) {
            $.currentLocale = $.locales[lang] || Object.create(null);
        }
    }
}

/**
 * Translate according to given key.
 *
 * @param  {string} key
 * @param  {dict}   parameters
 * @return {string}
 */
function trans(key, parameters = {}) {
    if (isEmpty($.currentLocale)) {
        loadLocales();
    }

    const segments = key.split('.');
    let temp = $.currentLocale || {};

    for (const i in segments) {
        if (isEmpty(temp[segments[i]])) {
            return key;
        } else {
            temp = temp[segments[i]];
        }
    }

    for (const i in parameters) {
        if (!isEmpty(parameters[i])) {
            temp = temp.replace(':'+i, parameters[i]);
        }
    }

    return temp;
}

if (process.env.NODE_ENV === 'test') {
    module.exports = {
        trans,
        loadLocales,
    };
}
