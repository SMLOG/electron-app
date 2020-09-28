var SLD = require("./src/SecondLevelDomains");
var URI = require("./src/URI")(window, null, null, SLD);
var URITemplate = require("./src/URITemplate")(window, URI);
var fragmentQuery = require("./src/URI.fragmentQuery")(URI);

module.exports = URI;
