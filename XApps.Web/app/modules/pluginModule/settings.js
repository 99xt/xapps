﻿define(function (require) {

    //load dependencies
    var serverPath = require('path!../../../server/');

    return {
        urls: {
            plugins: serverPath + "plugins.txt",
            defaultPlugins: serverPath + "default_plugins.txt"
        }
    };
});