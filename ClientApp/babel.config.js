module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/env",
            {
                useBuiltIns: "usage",
                corejs: {
                    version: 3,
                    proposals: true
                }
            }
        ],
        "react-app",
        [
            "@babel/preset-typescript",
            {
                isTSX: true,
                allExtensions: true
            }
        ]
    ];

    return {
        presets
    };
};
