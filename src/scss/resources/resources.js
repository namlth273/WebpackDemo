const path = require("path");

const resources = [
    "node_modules/bootstrap/scss/_functions.scss",
    "node_modules/bootstrap/scss/_variables.scss",
    "node_modules/bootstrap/scss/_mixins.scss",
    "src/scss/resources.scss",
];

module.exports = resources.map(file => path.resolve(__dirname, file));