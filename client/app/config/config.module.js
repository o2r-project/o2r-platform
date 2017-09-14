(function(){
    'use strict';

    /* eslint-disable angular/window-service */
    window.__env = window.__env || {};
    window.__env.userLevels = {};
    var env = {
        server : window.__env.server || 'http://localhost',
        //server : window.__env.server || 'https://o2r.uni-muenster.de',
        c_api: window.__env.api || '/api/v1',
        sizeRestriction: window.__env.sizeRestriction || 10000000,
        disableTracking: window.__env.disableTracking || false,
        enableDebug: window.__env.enableDebug || false,
        version: window.__env.version || 'deployment',
        userLevels: {
            admins: window.__env.userLevels.admins || 1000,
            editors: window.__env.userLevels.editors || 500,
            knowns: window.__env.userLevels.knowns || 100,
            users: window.__env.userLevels.users || 0
        }
    };
    env.api = env.server + env.c_api;

    /* eslint-enable angular/window-service */

    angular
        .module('conf', [])
        .constant('env', env);

})();