Components.utils.import("resource://gre/modules/Services.jsm");

var EXPORTED_SYMBOLS = [ "gprivacyGoogle" ];

function gprivacyGoogle(engines) {
  this.engines = engines;
  this.gpr     = engines.gpr;
  
  this.PATTERN = /https?:\/\/((?!(maps|code|(plus(one)?)))\w+\.)*?(google)\.\w+\//
}

gprivacyGoogle.prototype = {
  ID:        "google",
  NAME:      "Google",
  TRACKATTR:  [ "onmousedown", "data-ctorig" ],
  
  loggedIn: function(doc) {
    return doc.getElementById("gbi4s1") == null;
  },
  
  isTracking: function(doc, link) {
    return this.super.isTracking(doc, link) ||
           (doc.location.hostname && doc.location.hostname.match(/^news\./) && link.hasAttribute("url"))
  },
  
  removeTracking: function(doc, link) {
    if(!doc.location.hostname.match(/^news\./))
      return this.super.removeTracking(doc, link);
    link.classList.add("_tracked");
  },
  
};
