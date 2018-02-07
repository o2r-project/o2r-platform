// credits to Jurgen Van de Moere, 2016. http://www.jvandemo.com/how-to-configure-your-angularjs-application-using-environment-variables/
(function(){
    window.__env = window.__env || {};
    window.__env.server = /*String containing server address */;
    window.__env.api = /*String containing base api*/;
    window.__env.sizeRestriction = /*integer*/;
    window.__env.disableTracking = /*true/false, default is false*/;
    window.__env.enableDebug = /*true/false, default is false*/;
    window.__env.piwik = /*String containing piwik server adress*/;
    window.__env.userLevels = {};
    window.__env.userLevels.admins = /*Integer containing the required user level for admin status*/;
    window.__env.userLevels.editors = /*Integer containing the required user level for editor status*/;
    window.__env.userLevels.knowns = /*Integer containing the required user level for known user status*/;
    window.__env.userLevels.users = /*Integer containing the required user level for unknown user status*/;
})();