const OFF = 0;
const WARN = 1;
const ERROR = 2;
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
           "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },
    "parser": "babel-eslint",
    "plugins": [
        "react"
            ],
    "rules": {
    // 详细的规则
    "quotes": [ERROR, "single"], //单引号
    }
  }
   
