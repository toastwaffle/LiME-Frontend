module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "sort-imports-es6-autofix"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-process-env": [
            "error"
        ],
        "sort-imports-es6-autofix/sort-imports-es6": [
            "error",
            {
                "ignoreCase": false,
                "ignoreMemberSort": false,
                "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
            }
        ]
    }
};
