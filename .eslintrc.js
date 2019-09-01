module.exports = {
  "plugins": [ "react" ],
  "extends":[ 
    "standard",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "rules": {
    "no-undef": "error",
    "no-use-before-define": 2,
    "camelcase": 0,
    "react/prop-types": 0
  },

  "env": {
    "browser": true,
    "node": true
},

globals: {
  "Promise": true,
  "fetch": true
}
  
};

// "extends": "standard"

// "extends": [
//   "eslint:recommended",
//   "plugin:react/recommended"
// ]